package services

import (
	"Durianpay/models"
	"Durianpay/util/authentication"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

// simple hardcoded users
var Users = map[string]struct {
	Password string
	Role     string
}{
	"cs@durian.money": {Password: "cs123", Role: "cs"},
	"op@durian.money": {Password: "op123", Role: "operation"},
}

var (
	ErrUserNotFound = errors.New("user not found")
)

// MyClaims claims
type MyClaims struct {
	Email string `json:"email"`
	Role  string `json:"role"`
	jwt.RegisteredClaims
}

func GetJwtToken(request models.AuthenticationRequest) (string, error) {
	user, ok := Users[request.Email]
	if !ok || request.Password != user.Password {
		return "user not found", ErrUserNotFound
	}

	claims := MyClaims{
		Email: request.Email,
		Role:  user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtSecret, err := authentication.GetJwtSecretKey()
	if err != nil {
		return "JWT Secret Key not found", ErrUserNotFound
	}
	result, err := token.SignedString(jwtSecret)
	if err != nil {
		fmt.Println("Error signing JWT:", err)
		return "", err
	}

	return result, err
}
