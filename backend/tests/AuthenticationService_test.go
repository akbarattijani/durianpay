package tests

import (
	"Durianpay/models"
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetJwtToken_Success(t *testing.T) {
	req := models.AuthenticationRequest{
		Email:    "cs@durian.money",
		Password: "cs123",
	}

	token, err := services.GetJwtToken(req)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if token == "" {
		t.Fatal("Expected token, got empty string")
	}
}

func TestGetJwtToken_InvalidPassword(t *testing.T) {
	req := models.AuthenticationRequest{
		Email:    "cs@durian.money",
		Password: "wrongpass",
	}

	_, err := services.GetJwtToken(req)
	if err == nil {
		t.Fatal("Expected error, got nil")
	}
}

func TestGetJwtToken_InvalidUser(t *testing.T) {
	req := models.AuthenticationRequest{
		Email:    "unknown@durian.money",
		Password: "pass",
	}

	_, err := services.GetJwtToken(req)
	if err == nil {
		t.Fatal("Expected error, got nil")
	}
}

func TestAuthMiddleware_Success(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)

	token, err := services.GetJwtToken(models.AuthenticationRequest{
		Email:    "cs@durian.money",
		Password: "cs123",
	})
	if err != nil {
		t.Fatalf("failed to get token: %v", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	handler := services.AuthMiddleware(func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	if err := handler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("Expected 200, got %d", rec.Code)
	}
}

func TestAuthMiddleware_MissingToken(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	handler := services.AuthMiddleware(func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	if err := handler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("Expected 401, got %d", rec.Code)
	}
}

func TestCheckRole_Forbidden(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// attach user role not "operation"
	c.Set("user", &services.MyClaims{
		Email: "cs@durian.money",
		Role:  "cs",
	})

	handler := services.CheckRole(func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	if err := handler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusForbidden {
		t.Fatalf("Expected 403, got %d", rec.Code)
	}
}
