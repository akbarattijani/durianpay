**BACKEND (Go 1.24.0)**
=====================
Recommendation running all command Terminal use **GoLand IDE**


***Project Structure Design***
  1. **/constrains** : all variable and enum file store in this
  2. **/handlers** : all file and functions for interactions API endpoint (/dashboard/v1/*****) store in this
     1. Get request body, and parameter
     2. Call service for get data
     3. Return response API
  3. **/models** : all file for view data model store in this
  4. **/services** : all file for support handlers data, store in this
     1. Access data/resource
     2. Bussines Logic
  5. **/util** : additional function like convert, access firebase, access Environment, store in this
  6. **.env** : file for store all key
  7. **firebase-service-account.json** : file credential for access remote config
      1. saved in directory **/backend/**
  8. **go.mod** : file for descripe all depedencies required
  9. **main.go** : main file
  10. **/test** : all file for test, store in this

- **Depedencies**
  1. **JWT** : for Set and Get JWT Token
  2. **godotenv** : for get value in .env file
  3. **Echo** : for create API endpoint


- **Install Swagger UI use Docker & Running Swagger (OpenAPI 3.0.0)**
  - Documentation for all API
    1. install docker & open docker
    2. open target directory to **/backend** on Terminal
    3. docker run -p 8080:8080 -e SWAGGER_JSON=/swagger/openapi.yaml -v $(pwd)/openapi.yaml:/swagger/openapi.yaml swaggerapi/swagger-ui
    4. open http://localhost:8080/ on browser


- **Makefile Command**
  1. **make build** : for build project
  2. **make clean** : remove durianpay file
  3. **make run** : for running API project on http://localhost:8080/
  4. **make run-dev** : for run development API project
  5. **make test** : for running all tests


- **Free port 8080**
    1. open Terminal
    2. lsof -i :8080
    3. kill <PID>
  

- **Step Running Server**
    1. make sure port 8080 dont use
    2. open target directory to **/backend** on Terminal
    3. run **make build**
    4. run **make run**


- **Credentials**
  1. Firebase Remote Config
     1. **JWT_SECRET_KEY** : jwt secret key store in firebase
     2. **PAYMENT_DATA_HARDCODED** : for provide all data payment hardcoded in json format
  2. Authentication User 
     1. CS Role
        - email : **cs@durian.money**
        - password : **cs123**
     2. Operation
        - email : **op@durian.money**
        - password : **op123**

**FRONTEND (Vue 3.5.22)**
=====================
Recommendation running all command Terminal use **VS Code**

***Project Structure Design***
- Design Pattern using **MVVM**

  1. **/src/assets** : all file for assets like image
  2. **/src/components** : all file spesific components store in this
  3. **/src/models** : all file for view data model store in this
  4. **/src/services** : all file for get data from API
  5. **/src/view-models** : all file for ViewModel
     1. access services
     2. Bussines Logic
  6. **/src/view** : all file for View (UI)
      1. access ViewModel for get data and watch state
      2. UI page design
  7. **/test** : all file for test, store in this


- **Depedencies**
    1. **Axios** : for API request
    2. **Pinia** : for State Management
    3. **Vue-Router** : for navigate page


- **Makefile Command**
    1. **make build** : for build project
    3. **make run** : for running website
    4. **make run dev** : for run webiste with development type
    5. **make test** : for running all tests
    6. **make install** : for install all depedencies
    7. **make lint** : running Linter


- **Step Running Website**
    1. make sure url http://localhost:8080/ is running with this API Go
    2. open target directory to **/frontend** on Terminal
    3. run **make install**
    4. run **make run dev**


- **Credentials**
    1. Authentication User
        1. CS Role
            - email : **cs@durian.money**
            - password : **cs123**
        2. Operation
            - email : **op@durian.money**
            - password : **op123**