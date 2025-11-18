package services

import (
	"Durianpay/models"
	"Durianpay/util"
	"encoding/json"
	"errors"
	"sort"
	"strconv"
	"strings"
	"sync"
)

var (
	ErrNotFound = errors.New("not found")
)

// PaymentData model for store all payment data hardcoded
type PaymentData struct {
	mu       sync.RWMutex
	Payments map[string]*models.Payment
}

func NewPayment() *PaymentData {
	// create array variable
	paymentData := &PaymentData{Payments: map[string]*models.Payment{}}
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
		paymentData.Payments[p.ID] = &cp
	}

	return paymentData
}

func (s *PaymentData) ListPayments() []*models.Payment {
	s.mu.RLock()
	defer s.mu.RUnlock()

	res := make([]*models.Payment, 0, len(s.Payments))
	for _, p := range s.Payments {
		res = append(res, p)
	}

	return res
}

func (s *PaymentData) GetPayment(id string) (*models.Payment, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	p, ok := s.Payments[id]
	if !ok {
		return nil, ErrNotFound
	}

	return p, nil
}

func (s *PaymentData) MarkReviewed(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	p, ok := s.Payments[id]
	if !ok {
		return ErrNotFound
	}

	p.Reviewed = true
	return nil
}

func PaymentSorting(sortingParam string, payments []*models.Payment) {
	switch sortingParam {
	case "amount_asc":
		sort.Slice(payments, func(i, j int) bool { return payments[i].Amount < payments[j].Amount })
	case "amount_desc":
		sort.Slice(payments, func(i, j int) bool { return payments[i].Amount > payments[j].Amount })
	case "id_asc":
		sort.Slice(payments, func(i, j int) bool {
			idI, _ := strconv.Atoi(strings.TrimPrefix(payments[i].ID, "pd"))
			idJ, _ := strconv.Atoi(strings.TrimPrefix(payments[j].ID, "pd"))
			return idI < idJ
		})
	case "id_desc":
		sort.Slice(payments, func(i, j int) bool {
			idI, _ := strconv.Atoi(strings.TrimPrefix(payments[i].ID, "pd"))
			idJ, _ := strconv.Atoi(strings.TrimPrefix(payments[j].ID, "pd"))
			return idI > idJ
		})
	default: // date_desc
		sort.Slice(payments, func(i, j int) bool { return payments[i].CreatedAt.After(payments[j].CreatedAt) })
	}
}

func PaymentPagination(page int, payments []*models.Payment) []*models.Payment {
	if page < 1 {
		page = 1
	}

	start := (page - 1) * 10
	end := start + 10
	if start >= len(payments) {
		return []*models.Payment{}
	}
	if end > len(payments) {
		end = len(payments)
	}

	return payments[start:end]
}

func PaymentsFiltered(status string, payments []*models.Payment) []*models.Payment {
	filtered := []*models.Payment{}
	for _, payment := range payments {
		if string(payment.Status) == status {
			filtered = append(filtered, payment)
		}
	}

	return filtered
}
