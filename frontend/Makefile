# Makefile untuk project Vue.js

# Variabel
NPM = npm
VUE_CLI_SERVICE = $(NPM) run
VUE_CLI_SERVICE_DEV= $(NPM) run dev

# Default target
.PHONY: help
help:
	@echo "Makefile Vue.js"
	@echo ""
	@echo "Commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make run          - Run server"
	@echo "  make run-dev      - Run dev server"
	@echo "  make build        - Build project for production"
	@echo "  make lint         - Run linter"
	@echo "  make clean        - Clean dist folder"

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Run development server
.PHONY: serve
run:
	$(VUE_CLI_SERVICE) serve

run dev:
	$(VUE_CLI_SERVICE_DEV) serve

# Build production
.PHONY: build
build:
	$(VUE_CLI_SERVICE) build

# Run linter
.PHONY: lint
lint:
	$(VUE_CLI_SERVICE) lint

# Clean build
.PHONY: clean
clean:
	rm -rf dist node_modules
