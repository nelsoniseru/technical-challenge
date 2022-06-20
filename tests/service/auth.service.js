const authModel = require("../../models/users")
exports.findExistingUser=(email)=>{
return authModel.findOne({email})
}

exports.createUser=(payload)=>{
    return authModel.create(payload)
}

exports.checkemail=(email)=>{
    return authModel.findOne({email})
}

