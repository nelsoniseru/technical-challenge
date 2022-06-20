const express = require("express")
const router = express.Router()
const Subscribe = require('../controller/subscribe')
const subscribeController = new Subscribe()
const {verifyAccessToken} = require('../helpers/jwt_helper.js')

router.post("/create-subscription",verifyAccessToken,subscribeController.postCreateSub)
router.delete("/cancel-subscription",verifyAccessToken,subscribeController.deleteSub)
router.get("/get-subscription/:subcriptionid",verifyAccessToken,subscribeController.getSub)
router.get("/get-subscriptions",verifyAccessToken,subscribeController.getSubs)
module.exports = router