# Adidas-Restful-Newsletter-Subscription-API

This is A node.js based RESTful CURD demo project, providing general functions like User Signup and Login, APIs Authorization , using RESTful apis to create/update/get/delete products and orders.

# Technologies used

-   SwaggerUI & OpenApi 3.0
-   Node.js
-   Express.js
-   Restful API
-   MongoDB & Mongoose
-   APIs Authorization (JWT)
-   Docker
-   Jest

# How to use

## 1. Clone Project into your local machine

```
git clone https://github.com/LQF2020/node-restful-api-swagger.git
```

## 2. Go into project folder and install project dependencies.

```
cd node-restful-api-swagger && npm i
```

## 3. Connecting to Database

### Default DB URIs are as follows:

Please make sure mongoDB Server service is installed and running on your localhost:27017.

```
DB_PROD_URI=mongodb://localhost:27017/node-restful-shop-prod
DB_DEV_URI=mongodb://localhost:27017/node-restful-shop-dev
DB_TEST_URI=mongodb://localhost:27017/node-restful-shop-test
```

> Alternatively, if you would like to connect DB remotely, just change DB URIs in `.env` file.

> For more details about MongoDB, click [here](https://www.mongodb.com/).

## 4. Setting environment file `.env`.

Simply copy `.env.sample` as `.env`, then edit it based on your need.

```
# App config
PROJECT_OWNER=%YOUR_NAME%
PROJECT_OWNER_EMAIL=%YOUR_EMAIL_ADDRESS%
HOST=127.0.0.1
PORT=3000

# Default DB URI
DB_PROD_URI=mongodb://localhost:27017/node-restful-shop-prod
DB_DEV_URI=mongodb://localhost:27017/node-restful-shop-dev
DB_TEST_URI=mongodb://localhost:27017/node-restful-shop-test

# Random sercet used for generating API accessToken
JWT_SECRET=%some_secrets%
JWT_EMAIL_SECRET=%some_secrets%

# Set it "true", an account activation link will be sent to user's email after sign up.
ENABLE_EMAIL_ADDRESS_VERIFICATION=false

# if "ENABLE_EMAIL_ADDRESS_VERIFICATION=true", you must provide details for setting up Email sender server.
SENDER_EMAIL_HOST=%SENDER_EMAIL_HOST%
SENDER_EMAIL_PORT=%SENDER_EMAIL_PORT%
SENDER_EMAIL_ID=%SENDER_EMAIL%
SENDER_EMAIL_PASSWORD=%SENDER_EMAIL_PASSWORD%

```

## 5. Start project

```
npm start
```

## 6. Play with APIs now !

Now, you are ready to test all APIs.
Just simply open your browser and access http://127.0.0.1:3000/api-docs.

# Docker

> #### Docker need to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/) .

> #### Please make sure you have followed Step 1 ~ Step 4 as above.

### Under the root path of project, start Docker service

```
docker-compose up
```

# APIs Authorization

## Some APIs are protected by accessToken (JWT), such as:

-   /api/subscribe/create-subscription (POST)
-   /api/subscribe/cancel-subscription (DELETE)
-   /api/subscribe/get-subscription/{subcriptionid} (GET)
-   /api/subscribe/get-subscriptions  (GET)
-  
## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.

```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, an unique accessToken will be returned.

# Available APIs

## Auth

| APIs               | Method |         Desc          |
| ------------------ | :----: | :-------------------: |
| /api/auth/register |  POST  | Register user account |
| /api/auth/login    |  POST  |      User Login       |

## Subscribe

| APIs                                            | Method | Desc                   | AccessToken |
| ----------------------------------------------- | ------ |------------------------| ------------|
| /api/subscribe/create-subscription              | POST   | Get all products       | Required    |
| /api/subscribe/cancel-subscription              | DELETE | Create a new product   | Required    |
| /api/subscribe/get-subscription/{subcriptionid} | GET    | Get a product by ID    | Required    |
| /api/subscribe/get-subscriptions                | GET    | Update a product by ID | Required    |



