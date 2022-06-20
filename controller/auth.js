const createError = require("http-errors")
let User = require('../models/users')
const bcrypt = require("bcryptjs")
let { authSchema } = require('../helpers/validation_schema')
let { signAccessToken } = require('../helpers/jwt_helper')

class Auth {
    async postRegister(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            const doestExist = await User.findOne({ email: result.email })
            if (doestExist) throw createError.Conflict(`${result.email} is already in use`)
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(result.password, salt)
            const password = hashedPassword
            const user = new User({ email: result.email, password })
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser._id)
            res.status(200).json({
                accessToken,
            })
        } catch (err) {
            if (err.isJoi) err.status = 422
            next(err)
        }
    }
    async postLogin(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({ email: result.email })
            if (!user) throw createError.Unauthorized('invalid credenials')

            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized('invalid credenials')
            const accessToken = await signAccessToken(user._id)
            res.status(200).json({
                accessToken,
            })
        } catch (err) {

            if (err.isJoi) {
                err.status = 422
                next(err)
            }
            next(createError.Unauthorized('invalid credenials'))
            next(err)

        }
    }
 
}
module.exports = Auth