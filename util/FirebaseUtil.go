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
