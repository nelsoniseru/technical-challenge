const createError = require("http-errors")
const { v4: uuidv4 } = require('uuid')
const Sub = require('../models/subscription')
const User = require('../models/users')
const sendmail = require("../helpers/mailtransport");
//uuidv4()
let { subscribeSchema, cancelSubSchema } = require('../helpers/validation_schema')
const ejs = require("ejs")
const path = require("path");

class Subscribe {
  async postCreateSub(req, res, next) {
    try {
      const result = await subscribeSchema.validateAsync({
        email: req.body.email,
        date_of_birth: req.body.date_of_birth,
        flag_for_content: req.body.flag_for_content
      })

      let existingSubscription = await Sub.findOne({ email: req.body.email })
    
      if (existingSubscription) throw createError.Conflict(`${result.email} has already been subscribed`)
      let sub = await Sub.create({
        email: req.body.email,
        firstname: req.body.firstname,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        newsletter_id: uuidv4(),
        flag_for_content: req.body.flag_for_content
      })

      if (sub) {
        let attch = [];
        ejs.renderFile(
          path.join(__dirname, "../mailbody/subscription.ejs"),
          {
            email: req.body.email,
          },
          async (err, data) => {
            if (err) {

              throw createError.BadRequest("This is a system error. Please contact with Account Manager")


            } else {
              res.status(200).json({
                msg: "Well Done!. You are now subscribed to the Adidas newsletter. We have sent a mail to you at " +
                  req.body.email +
                  " If you could not find the email in the INBOX then do not forget to check SPAM folder.",
                success: true,
              })


              sendmail.sendMail(
                req.body.email,
                "",
                "",
                "ADIDAS || Subscription Mail",
                data,
                attch
              );
            }
          }
        );
      }

    } catch (err) {
      if (err.isJoi) err.status = 422
      next(err)
    }

  }

  async deleteSub(req, res, next) {
    try {
      await cancelSubSchema.validateAsync({ email: req.body.email })
      let deletedSub = await Sub.deleteOne({ email: req.body.email })
      if (deletedSub.deletedCount != 0) return res.status(200).json({ message: "email unsubscribed successfully", success: true })
      if (deletedSub.deletedCount == 0) throw createError.BadRequest(`The email ${req.body.email} has not been subscribed for our newsletter`)
    } catch (err) {
      next(err)
    }

  }
  async getSub(req, res,next) {
    try {
      const id = req.params.subcriptionid
      const adminId = req.user.aud[0]
      let adminUser = await User.findOne({ _id: adminId })
      if (adminUser.role !== "admin") throw createError.Unauthorized()
      let result = await Sub.findOne({ _id: id }, { _id: 0 })
      if(!result)  throw createError.BadRequest("The particular subscription does not exist")
      res.status(200).json({ subscription: result })

    } catch (err) {
      next(err)
    }

  }
  async getSubs(req, res, next) {
    try {
      const adminId = req.user.aud[0]
      let adminUser = await User.findOne({ _id: adminId })
      if (adminUser.role !== "admin") throw createError.Unauthorized()
      let result = await Sub.find({}, { _id: 0 })
  
      res.status(200).json({ subscriptions: result })
    } catch (err) {
      next(err)
    }

  }
}

module.exports = Subscribe