package services

import (
	"Durianpay/constrains"
	"Durianpay/models"
	"errors"
	"sync"
	"time"
)

var (
	ErrNotFound = errors.New("not found")
)

// PaymentData model for store all payment data hardcoded
type PaymentData struct {
	mu       sync.RWMutex
	payments map[string]*models.Payment
}

func NewPayment() *PaymentData {
	// create array variable
	paymentData := &PaymentData{payments: map[string]*models.Payment{}}

	// add hardcoded data
	now := time.Now()
	paymentData.payments["pd1"] = &models.Payment{ID: "pd1", Amount: 1455003, Status: constrains.PaymentCompleted, Reviewed: false, CreatedAt: now.Add(-10 * time.Hour)}
	paymentData.payments["pd2"] = &models.Payment{ID: "pd2", Amount: 786000, Status: constrains.PaymentProcessing, Reviewed: false, CreatedAt: now.Add(-20 * time.Hour)}
	paymentData.payments["pd3"] = &models.Payment{ID: "pd3", Amount: 6744500, Status: constrains.PaymentFailed, Reviewed: false, CreatedAt: now.Add(-30 * time.Hour)}
	paymentData.payments["pd4"] = &models.Payment{ID: "pd4", Amount: 12743000, Status: constrains.PaymentCompleted, Reviewed: true, CreatedAt: now.Add(-40 * time.Hour)}
	paymentData.payments["pd5"] = &models.Payment{ID: "pd5", Amount: 12743000, Status: constrains.PaymentCompleted, Reviewed: true, CreatedAt: now.Add(-50 * time.Hour)}
	paymentData.payments["pd6"] = &models.Payment{ID: "pd6", Amount: 786000, Status: constrains.PaymentProcessing, Reviewed: false, CreatedAt: now.Add(-60 * time.Hour)}
	paymentData.payments["pd7"] = &models.Payment{ID: "pd7", Amount: 786000, Status: constrains.PaymentProcessing, Reviewed: false, CreatedAt: now.Add(-70 * time.Hour)}
	paymentData.payments["pd8"] = &models.Payment{ID: "pd8", Amount: 6744500, Status: constrains.PaymentFailed, Reviewed: false, CreatedAt: now.Add(-80 * time.Hour)}

	return paymentData
}

func (s *PaymentData) ListPayments() []*models.Payment {
	s.mu.RLock()
	defer s.mu.RUnlock()

	res := make([]*models.Payment, 0, len(s.payments))
	for _, p := range s.payments {
		res = append(res, p)
	}

	return res
}

func (s *PaymentData) GetPayment(id string) (*models.Payment, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	p, ok := s.payments[id]
	if !ok {
		return nil, ErrNotFound
	}

	return p, nil
}

func (s *PaymentData) MarkReviewed(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	p, ok := s.payments[id]
	if !ok {
		return ErrNotFound
	}

	p.Reviewed = true
	return nil
}
