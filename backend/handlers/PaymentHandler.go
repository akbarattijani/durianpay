package handlers

import (
	"Durianpay/models"
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
	"sort"
	"strconv"
)

func ListPaymentHandler(paymentData *services.PaymentData) echo.HandlerFunc {
	return func(c echo.Context) error {
		payments := paymentData.ListPayments()

		// filter status
		status := c.QueryParam("status")
		if status != "" {
			filtered := []*models.Payment{}
			for _, payment := range payments {
				if string(payment.Status) == status {
					filtered = append(filtered, payment)
				}
			}

			payments = filtered
		}

		// sorting
		sortParam := c.QueryParam("sort")
		switch sortParam {
		case "amount_asc":
			sort.Slice(payments, func(i, j int) bool { return payments[i].Amount < payments[j].Amount })
		case "amount_desc":
			sort.Slice(payments, func(i, j int) bool { return payments[i].Amount > payments[j].Amount })
		default: // date_desc
			sort.Slice(payments, func(i, j int) bool { return payments[i].CreatedAt.After(payments[j].CreatedAt) })
		}

		// pagination
		page, _ := strconv.Atoi(c.QueryParam("page"))
		if page < 1 {
			page = 1
		}

		size, _ := strconv.Atoi(c.QueryParam("size"))
		if size <= 0 {
			size = 10
		}

		start := (page - 1) * size
		end := start + size
		if start >= len(payments) {
			return c.JSON(http.StatusOK, []models.Payment{})
		}
		if end > len(payments) {
			end = len(payments)
		}

		out := payments[start:end]
		return c.JSON(http.StatusOK, out)
	}
}

func ReviewPaymentHandler(store *services.PaymentData) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		if id == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "missing id"})
		}
		if err := store.MarkReviewed(id); err != nil {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "payment not found"})
		}

		return c.JSON(http.StatusOK, map[string]string{"status": "reviewed"})
	}
}
