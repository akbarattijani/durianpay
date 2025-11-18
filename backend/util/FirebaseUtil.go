package util

import (
	"context"
	"encoding/json"
	"fmt"
	"golang.org/x/oauth2/google"
	"io"
	"net/http"
	"os"
)

// getAccessToken generates OAuth2 token using Firebase service account
func getAccessToken() (string, error) {
	data, err := os.ReadFile("firebase-service-account.json")
	if err != nil {
		return "", fmt.Errorf("failed to read service account: %w", err)
	}

	conf, err := google.JWTConfigFromJSON(
		data,
		"https://www.googleapis.com/auth/firebase.remoteconfig",
	)
	if err != nil {
		return "", fmt.Errorf("failed to parse JWT config: %w", err)
	}

	token, err := conf.TokenSource(context.Background()).Token()
	if err != nil {
		return "", fmt.Errorf("failed to get token: %w", err)
	}

	return token.AccessToken, nil
}

// fetchRemoteConfig returns the full Firebase Remote Config JSON
func fetchRemoteConfig(projectID string) (map[string]interface{}, error) {
	accessToken, err := getAccessToken()
	if err != nil {
		return nil, err
	}

	url := fmt.Sprintf(
		"https://firebaseremoteconfig.googleapis.com/v1/projects/%s/remoteConfig",
		projectID,
	)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var config map[string]interface{}
	json.Unmarshal(body, &config)

	return config, nil
}

// GetRemoteValue returns a specific RC parameter value
func GetRemoteValue(key string) (string, error) {
	if os.Getenv("APP_ENV") == "test" {
		mockValues := map[string]string{
			"JWT_SECRET_KEY":         "TESTSECRET123",
			"PAYMENT_DATA_HARDCODED": "[{\"id\":\"pd1\",\"amount\":1455003,\"status\":\"completed\",\"reviewed\":false,\"created_at\":\"2025-01-01T10:00:00Z\"},{\"id\":\"pd2\",\"amount\":786000,\"status\":\"processing\",\"reviewed\":false,\"created_at\":\"2025-01-02T09:00:00Z\"},{\"id\":\"pd3\",\"amount\":6744500,\"status\":\"failed\",\"reviewed\":false,\"created_at\":\"2025-01-03T08:00:00Z\"},{\"id\":\"pd4\",\"amount\":12743000,\"status\":\"completed\",\"reviewed\":true,\"created_at\":\"2025-01-04T07:00:00Z\"},{\"id\":\"pd5\",\"amount\":932000,\"status\":\"processing\",\"reviewed\":false,\"created_at\":\"2025-01-05T06:00:00Z\"}]",
		}
		if val, ok := mockValues[key]; ok {
			return val, nil
		}
	}

	projectId := GetEnv("FIREBASE_PROJECT_ID")
	config, err := fetchRemoteConfig(projectId)
	if err != nil {
		return "", err
	}

	params, ok := config["parameters"].(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("parameters section not found")
	}

	param, ok := params[key].(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("key %s not found", key)
	}

	defVal := param["defaultValue"].(map[string]interface{})
	value := defVal["value"].(string)

	return value, nil
}
