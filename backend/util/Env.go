package util

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}
}

func GetEnv(key string) string {
	return os.Getenv(key)
}

func LoadEnvForTest() {
	err := godotenv.Load(".env.test")
	if err != nil {
		log.Println("WARNING: .env.test not found, using default values")
	}
}
