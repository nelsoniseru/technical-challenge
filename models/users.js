const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
  
    
})

// UserSchema.pre('save',async function(next){
//     try{
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(this.password,salt)
//     this.password = hashedPassword
//     next()
//     }catch(err){
//         next(err)
//     }
    
// })

UserSchema.methods.isValidPassword = async function(password){
    try{
    return await bcrypt.compareSync(password, this.password)
    }catch(e){
        throw e
    }
}
const User = new mongoose.model('User',UserSchema)
module.exports = User