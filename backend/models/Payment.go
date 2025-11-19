package models

import (
	"Durianpay/constrains"
	"time"
)

type Payment struct {
	ID        string                   `json:"id"`
	Name      string                   `json:"name"`
	Amount    int                      `json:"amount"`
	Status    constrains.PaymentStatus `json:"status"` // completed, processing, failed
	Reviewed  bool                     `json:"reviewed"`
	CreatedAt time.Time                `json:"created_at"`
}
