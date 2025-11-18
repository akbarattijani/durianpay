package tests

import (
	"Durianpay/handlers"
	"Durianpay/models"
	"bytes"
	"encoding/json"
	"github.com/labstack/echo/v4"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAuthHandler_Success(t *testing.T) {
	e := echo.New()
	reqBody := models.AuthenticationRequest{
		Email:    "cs@durian.money",
		Password: "cs123",
	}
	body, _ := json.Marshal(reqBody)

	req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if err := handlers.AuthHandler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", rec.Code)
	}
}

func TestAuthHandler_InvalidPassword(t *testing.T) {
	e := echo.New()
	reqBody := models.AuthenticationRequest{
		Email:    "cs@durian.money",
		Password: "wrongpass",
	}
	body, _ := json.Marshal(reqBody)

	req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if err := handlers.AuthHandler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("Expected status 401, got %d", rec.Code)
	}
}
