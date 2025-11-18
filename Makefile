BINARY_NAME=durianpay
MAIN_FILE=main.go

run: build
	./$(BINARY_NAME)

build:
	go build -o $(BINARY_NAME) $(MAIN_FILE)

run-dev:
	go run $(MAIN_FILE)

test:
	go test ./...

fmt:
	go fmt ./...

clean:
	rm -f $(BINARY_NAME)