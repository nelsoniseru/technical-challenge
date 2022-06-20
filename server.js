const express = require("express")
const morgan = require("morgan")
const createError = require("http-errors")
const redisClient = require('./helpers/init_redis')
const connectRedis = require("connect-redis");
const session = require('express-session');
const cors = require("cors")
const authRoute = require("./routes/auth")
const subscribeRoute = require("./routes/subscribe")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api_docs/swagger.js');

require("dotenv").config()
require('./helpers/init_mongodb')

var app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const RedisStore = connectRedis(session);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.enable("trust proxy")
app.use(cors())
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 10, // session max age in miliseconds
        },
    })
);
app.use(morgan(process.env.DEV))
app.use('/api/auth', authRoute)
app.use('/api/subscribe', subscribeRoute)
app.use(async (req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error) 
    next(createError.NotFound('this route is not found'))
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({ status: err.status || 500, message: err.message })
})

module.exports = app