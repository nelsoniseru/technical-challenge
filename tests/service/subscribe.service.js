const subscribeModel = require("../../models/subscription")
exports.subscribe = (payload) =>{
   return subscribeModel.create(payload) 
}

exports.findOneSubscription = (id) =>{
    return subscribeModel.findOne({_id:id}) 
}

exports.findAll = () =>{
    return subscribeModel.findOne({}) 
}
exports.cancelSubscription = (email) =>{
    return subscribeModel.deleteOne({email})
}
