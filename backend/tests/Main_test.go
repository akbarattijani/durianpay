package tests

import (
	"Durianpay/routes"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/labstack/echo/v4"
)

func TestMainFunctionalOperationRole(t *testing.T) {
	os.Setenv("APP_ENV", "test")

	echo := echo.New()
	routes.RegisterRoutes(echo)

	httpTest := httptest.NewServer(echo.Server.Handler)
	defer httpTest.Close()

	// Authentication Test
	body := `{"email": "op@durian.money", "password": "op123"}`
	response, err := http.Post(httpTest.URL+"/dashboard/v1/auth/login", "application/json", bytes.NewBufferString(body))
	if err != nil {
		t.Fatalf("Login request failed: %v", err)
	}
	if response.StatusCode != http.StatusOK {
		t.Fatalf("Expected 200, got %d", response.StatusCode)
	}

	var result map[string]string
	json.NewDecoder(response.Body).Decode(&result)
	token := result["token"]
	if token == "" {
		t.Fatal("Expected token, got empty string")
	}

	// Payments Test
	request, _ := http.NewRequest(http.MethodGet, httpTest.URL+"/dashboard/v1/payments", nil)
	request.Header.Set("Authorization", "Bearer "+token)
	responsePayment, err := http.DefaultClient.Do(request)

	if err != nil {
		t.Fatalf("Payments request failed: %v", err)
	}
	if responsePayment.StatusCode != http.StatusOK {
		t.Fatalf("Expected 200, got %d", responsePayment.StatusCode)
	}

	// Payment Review Test
	requestReview, _ := http.NewRequest(http.MethodPatch, httpTest.URL+"/dashboard/v1/payment/pd1/review", nil)
	requestReview.Header.Set("Authorization", "Bearer "+token)
	responseReview, err := http.DefaultClient.Do(requestReview)

	if err != nil {
		t.Fatalf("Review request failed: %v", err)
	}
	if responseReview.StatusCode != http.StatusOK {
		t.Fatalf("Expected 200, got %d", responseReview.StatusCode)
	}
}

func TestMainFunctionalCsRole(t *testing.T) {
	os.Setenv("APP_ENV", "test")

	echo := echo.New()
	routes.RegisterRoutes(echo)

	httpTest := httptest.NewServer(echo.Server.Handler)
	defer httpTest.Close()

	// Authentication Test
	body := `{"email": "cs@durian.money", "password": "cs123"}`
	response, err := http.Post(httpTest.URL+"/dashboard/v1/auth/login", "application/json", bytes.NewBufferString(body))
	if err != nil {
		t.Fatalf("Login request failed: %v", err)
	}
	if response.StatusCode != http.StatusOK {
		t.Fatalf("Expected 200, got %d", response.StatusCode)
	}

	var result map[string]string
	json.NewDecoder(response.Body).Decode(&result)
	token := result["token"]
	if token == "" {
		t.Fatal("Expected token, got empty string")
	}

	// Payments Test
	request, _ := http.NewRequest(http.MethodGet, httpTest.URL+"/dashboard/v1/payments", nil)
	request.Header.Set("Authorization", "Bearer "+token)
	responsePayment, err := http.DefaultClient.Do(request)

	if err != nil {
		t.Fatalf("Payments request failed: %v", err)
	}
	if responsePayment.StatusCode != http.StatusOK {
		t.Fatalf("Expected 200, got %d", responsePayment.StatusCode)
	}

	// Payment Review Test (Forbidden because is not Operation Role)
	requestReview, _ := http.NewRequest(http.MethodPatch, httpTest.URL+"/dashboard/v1/payment/pd1/review", nil)
	requestReview.Header.Set("Authorization", "Bearer "+token)
	responseReview, err := http.DefaultClient.Do(requestReview)

	if err != nil {
		t.Fatalf("Review request failed: %v", err)
	}
	if responseReview.StatusCode != http.StatusForbidden {
		t.Fatalf("Expected 403, got %d", responseReview.StatusCode)
	}
}
