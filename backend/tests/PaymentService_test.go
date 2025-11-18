package tests

import (
	"Durianpay/models"
	"Durianpay/services"
	"os"
	"strconv"
	"testing"
	"time"
)

func setupTestPaymentData() *services.PaymentData {
	err := os.Setenv("APP_ENV", "test")
	if err != nil {
		return nil
	}

	data := services.NewPayment()
	data.Payments["pd1"] = &models.Payment{ID: "pd1", Amount: 100, Status: "completed", CreatedAt: time.Now()}
	data.Payments["pd2"] = &models.Payment{ID: "pd2", Amount: 200, Status: "processing", CreatedAt: time.Now().Add(-time.Hour)}
	data.Payments["pd3"] = &models.Payment{ID: "pd3", Amount: 300, Status: "failed", CreatedAt: time.Now().Add(-2 * time.Hour)}

	return data
}

func TestGetPayment_Success(t *testing.T) {
	data := setupTestPaymentData()

	p, err := data.GetPayment("pd1")
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if p.ID != "pd1" {
		t.Fatalf("Expected 'pd1', got %s", p.ID)
	}
}

func TestGetPayment_NotFound(t *testing.T) {
	data := setupTestPaymentData()

	_, err := data.GetPayment("pdX")
	if err == nil {
		t.Fatal("Expected error, got nil")
	}
}

func TestMarkReviewed_Success(t *testing.T) {
	data := setupTestPaymentData()

	err := data.MarkReviewed("pd2")
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if !data.Payments["pd2"].Reviewed {
		t.Fatalf("Expected Reviewed=true but false")
	}
}

func TestPaymentSorting_AmountAsc(t *testing.T) {
	data := setupTestPaymentData()
	list := data.ListPayments()
	services.PaymentSorting("amount_asc", list)

	if list[0].Amount != 100 || list[1].Amount != 200 || list[2].Amount != 300 {
		t.Fatalf("Sorting failed: %v", list)
	}
}

func TestPaymentsFiltered(t *testing.T) {
	data := setupTestPaymentData()
	list := data.ListPayments()

	filtered := services.PaymentsFiltered("failed", list)
	if len(filtered) != 1 || filtered[0].Status != "failed" {
		t.Fatal("Filtering failed")
	}
}

func TestPaymentPagination(t *testing.T) {
	list := []*models.Payment{}

	// Generate dummy 25 data
	for i := 1; i <= 25; i++ {
		id := "pd" + strconv.Itoa(i)
		list = append(list, &models.Payment{
			ID:        id,
			CreatedAt: time.Now(),
		})
	}

	page2 := services.PaymentPagination(2, list)
	if len(page2) != 10 || page2[0].ID != "pd11" {
		t.Fatal("Pagination failed")
	}
}
