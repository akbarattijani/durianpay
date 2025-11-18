package services

import (
	"Durianpay/models"
	"Durianpay/util"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"
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
	jwtSecret, err := GetJwtSecretKey()
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

var (
	ErrJwtNotFound = errors.New("JWT not found")
)

func GetJwtSecretKey() ([]byte, error) {
	jwtSecret, err := util.GetRemoteValue("JWT_SECRET_KEY")
	if err != nil {
		return nil, ErrJwtNotFound
	}

	return []byte(jwtSecret), nil
}

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		auth := c.Request().Header.Get("Authorization")
		if auth == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "missing authorization"})
		}

		parts := strings.SplitN(auth, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid authorization"})
		}

		// get jwt secret key
		jwtSecret, err := GetJwtSecretKey()
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "JWT Secret Key not found"})
		}

		token := parts[1]
		parser := jwt.NewParser()
		var claims MyClaims
		jwtToken, err := parser.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) { return jwtSecret, nil })
		if err != nil || !jwtToken.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
		}

		// attach to context
		c.Set("user", &MyClaims{Email: claims.Email, Role: claims.Role})
		return next(c)
	}
}

func CheckRole(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := c.Get("user").(*MyClaims)
		if u.Role != "operation" {
			return c.JSON(http.StatusForbidden, map[string]string{"error": "Operation Role required"})
		}

		return next(c)
	}
}
