package tests

import (
	"Durianpay/handlers"
	"Durianpay/models"
	"Durianpay/services"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/labstack/echo/v4"
)

func setupHandlerData() *services.PaymentData {
	data := &services.PaymentData{Payments: map[string]*models.Payment{}}
	data.Payments["pd1"] = &models.Payment{ID: "pd1", Amount: 100, Status: "completed", CreatedAt: time.Now()}
	data.Payments["pd2"] = &models.Payment{ID: "pd2", Amount: 200, Status: "processing", CreatedAt: time.Now().Add(-1 * time.Hour)}
	data.Payments["pd3"] = &models.Payment{ID: "pd3", Amount: 300, Status: "failed", CreatedAt: time.Now().Add(-2 * time.Hour)}
	return data
}

func TestListPaymentHandler_Success(t *testing.T) {
	e := echo.New()
	store := setupHandlerData()

	req := httptest.NewRequest(http.MethodGet, "/payments?status=completed&sort=amount_desc&page=1", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	handler := handlers.ListPaymentHandler(store)
	if err := handler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("Expected 200, got %d", rec.Code)
	}

	var response []models.Payment
	if err := json.Unmarshal(rec.Body.Bytes(), &response); err != nil {
		t.Fatalf("Invalid response: %v", err)
	}
	if len(response) != 1 || response[0].Status != "completed" {
		t.Fatalf("Filtering error: %v", response)
	}
}

func TestReviewPaymentHandler_Success(t *testing.T) {
	e := echo.New()
	store := setupHandlerData()

	req := httptest.NewRequest(http.MethodPost, "/payments/pd1/review", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/payments/:id/review")
	c.SetParamNames("id")
	c.SetParamValues("pd1")

	handler := handlers.ReviewPaymentHandler(store)
	if err := handler(c); err != nil {
		t.Fatal(err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("Expected 200, got %d", rec.Code)
	}
}
