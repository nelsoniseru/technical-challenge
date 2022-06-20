const express = require("express")
const router = express.Router()
const Auth = require('../controller/auth')
const authController = new Auth()
router.post('/register',authController.postRegister)
router.post("/login",authController.postLogin)


module.exports = router