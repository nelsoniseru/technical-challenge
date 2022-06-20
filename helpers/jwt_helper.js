const jwt = require('jsonwebtoken')
const createError = require('http-errors')
module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET 
            const options = {
                expiresIn:'20m',
                audience:[userId]
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err){
                    console.log(err)
                    //reject(err)
                    reject(createError.InternalServerError())
              
                } 
                resolve(token)
            })
        })
    },
    verifyAccessToken:(req,res,next)=>{
        let authHeader = req.headers['authorization']
        if(!authHeader) return next(createError.Unauthorized())
        const bearerToken = authHeader.split(' ')
        let token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
            if(err){
             return next(createError.Unauthorized())
            }
            req.user = payload
            next()
        })

    },
 
  }