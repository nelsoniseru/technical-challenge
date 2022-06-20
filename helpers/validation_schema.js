const joi = require('joi')

const authSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(2).required()
})


const subscribeSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    date_of_birth: joi.string().min(2).required(),
    flag_for_content:joi.boolean().required(),
})
const cancelSubSchema = joi.object({
    email: joi.string().email().lowercase().required(),
})

module.exports={
    authSchema,
    subscribeSchema,
    cancelSubSchema 
}