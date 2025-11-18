package authentication

import (
	"Durianpay/util"
	"errors"
)

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
