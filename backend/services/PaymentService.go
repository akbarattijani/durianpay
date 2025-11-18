package services

import (
	"Durianpay/models"
	"Durianpay/util"
	"encoding/json"
	"errors"
	"sync"
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
	paymentJson, err := util.GetRemoteValue("PAYMENT_DATA_HARDCODED")
	if err != nil {
		panic(err)
	}

	var list []models.Payment
	if err := json.Unmarshal([]byte(paymentJson), &list); err != nil {
		return paymentData
	}

	for _, p := range list {
		cp := p
		paymentData.payments[p.ID] = &cp
	}

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
