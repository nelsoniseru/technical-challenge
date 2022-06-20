# Adidas-Restful-Newsletter-Subscription-API

This is A node.js express based RESTful Adidas newsletter subscription api.

# Technologies used

-   SwaggerUI & OpenApi 3.0
-   Node.js
-   Express.js
-   Restful API
-   MongoDB & Mongoose
-   APIs Authorization (JWT)
-   Docker
-   Jest
-   Redis

# How to use

## 1. Clone Project into your local machine

```
git clone git@github.com:nelsoniseru/technical-challenge.git
```

## 2. Go into project folder and install project dependencies.

```
cd technical-challenge && npm install
```

## 3. Connecting to Database

### Default DB URIs are as follows:

Please make sure mongoDB Server service is installed and running on your localhost:27017.
if your are using docker you can simply use the first url, otherwise use the second url
```
MONGODB_LOCAL=mongodb://nelson:mypassword@mongo/?authSource=admin
MONGODB_LOCAL=mongodb://localhost:27017/subscription

```
> Alternatively, if you would like to connect DB remotely, just change DB URIs in `.env` file.

> For more details about MongoDB, click [here](https://www.mongodb.com/).

 
## 4. Start project
This is applicable when you are running the project without docker
```
npm run dev
```
# seed the admin data into the database 
```
node ./helpers/init_seeder.js
```

## 5. Go to your browser and insert the url on your url bar !

Now, you are ready to test all APIs.
Just simply open your browser and access http://localhost:3000/api-docs.

# Docker

> #### Docker needs to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/) .

> #### Please make sure you have followed Step 1 ~ Step 3 as above.

### In your terminal, start Docker service

```
docker-compose up
```
### seeding the admin data in the docker environment
 This is to come into the docker environment where your project files are after you have build them with docker compose command

```
docker exec -it technical-challenge_node-app_1 bash
```
### And then running the command

```
node ./helpers/init_seeder.js
```

# Accessing mongo-express for docker

## simply just use this url
```
http://localhost:8080/
```

# APIs Authorization

## Some APIs are protected by accessToken (JWT), such as:

-   /api/subscribe/create-subscription (POST)
-   /api/subscribe/cancel-subscription (DELETE)
-   /api/subscribe/get-subscription/:subcriptionid (GET)
-   /api/subscribe/get-subscriptions  (GET)
-  

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.
```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, a unique accessToken will be returned.

# Admin
## The login details of the admin data seeded to the database

| Email               | Password  |
| --------------------|-----------|
| adidas@gmail.com    |adidasadmin|

# Level access

## This particular routes are accessed only by admin

| APIs                                            | Method | Desc                        | AccessToken |
| ----------------------------------------------- | ------ |------------------------     | ------------|
| /api/subscribe/get-subscription/:subcriptionid  | GET    | Get a subscription by ID    | Required    |
| /api/subscribe/get-subscriptions                | GET    | Get all subscription        | Required    |



# Available APIs

## User


| APIs               | Method |         Desc          |
| ------------------ | :----: | :-------------------: |
| /api/auth/register |  POST  | Register user account |
| /api/auth/login    |  POST  |      User Login       |

## Subscribe

| APIs                                            | Method | Desc                        | AccessToken |
| ----------------------------------------------- | ------ |------------------------     | ------------|
| /api/subscribe/create-subscription              | POST   | Create a new subscription   | Required    |
| /api/subscribe/cancel-subscription              | DELETE |  Cancel a subscription      | Required    |
| /api/subscribe/get-subscription/:subcriptionid  | GET    | Get a subscription by ID    | Required    |
| /api/subscribe/get-subscriptions                | GET    | Get all subscription        | Required    |

# DEVELOPER
NAME: NELSON ISERU,
JOB-TYPE: BACKEND ENGINEER


