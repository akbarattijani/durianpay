package models

import "time"

type Payment struct {
	ID        string    `json:"id"`
	Amount    int       `json:"amount"`
	Status    string    `json:"status"` // completed, processing, failed
	Reviewed  bool      `json:"reviewed"`
	CreatedAt time.Time `json:"created_at"`
}
