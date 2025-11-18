- **Install Swagger UI use Docker & Running Swagger**
    1. open target directory to **/backend**
    2. docker run -p 8080:8080 -e SWAGGER_JSON=/swagger/openapi.yaml -v $(pwd)/openapi.yaml:/swagger/openapi.yaml swaggerapi/swagger-ui
    3. open http://localhost:8080/ on browser

- 