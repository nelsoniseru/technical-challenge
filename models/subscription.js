const mongoose = require("mongoose")
const Schema = mongoose.Schema
const SubscribeSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    firstname:{
        type:String,
        
    },
    gender:{
        type:String,
    
    },
    date_of_birth:{
        type:Date,
        required:true
    },
    newsletter_id:{
        type:String,
        required:true
    },
    flag_for_content:{
        type:Boolean,
        required:true,
        default:false
    },

})

const Subscribe = new mongoose.model('Subscribe',SubscribeSchema)
module.exports = Subscribe