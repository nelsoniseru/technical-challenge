const supertest = require("supertest")
const User = require("../models/users")
const app = require('../server')
const mongoose = require('mongoose')
const authService = require('./service/auth.service')
const {signAccessToken} = require('../helpers/jwt_helper')
const userId = new mongoose.Types.ObjectId().toString()
const userInput = {
    id:userId,
    email:"nelsoniseru08@gmail.com",
    password:"nelsoniseru@2022"
}
const userInput2 = {
    id:userId,
    email:"nelsoniseru02@gmail.com",
    password:"nelsoniseru@2022"
}
beforeEach(async()=>{
   await User.deleteMany({})
})


describe('user register',()=>{
describe("given the email and password are valid",()=>{
   it('should return the user payload ',async()=>{
       supertest(app)
      .post("/api/auth/register")
      .send(userInput)
      .expect(200)
   })
})
describe("if the email already exist",()=>{
    it('should return a 422',async()=>{
       let emailExist = await authService.findExistingUser(userInput.email)
       supertest(app)
      .post("/api/auth/register")
      .expect(422)
    })
 })

 describe("create user",()=>{
    describe("given the email and password are valid",()=>{
    it('should return a signed accessToken',async()=>{
     const jwt = signAccessToken(userInput.id)
     let user = await authService.createUser(userInput)
     supertest(app)
     .post("/api/auth/register")
     .set('Authorization',`Bearer ${jwt}`)
     .send(user)
     .expect(200)
    })
})
 })
})

describe('user login',()=>{
    describe("given the email and password are valid",()=>{
        it('should return the user payload ',async()=>{
            supertest(app)
           .post("/api/auth/login")
           .send(userInput)
           .expect(200)
        })
     })
     describe("given that the email invalid",()=>{
        it('should return a 400',async()=>{
            let user = await authService.checkemail(userInput2.email)
            supertest(app)
           .post("/api/auth/login")
           .send(userInput)
           .expect(400)
        })
     })
     describe("given that the password does not match",()=>{
        it('should return a 400 ',async()=>{
            let user = await authService.checkemail(userInput2.email) 
            supertest(app)
           .post("/api/auth/login")
           .expect(400)
        })
     })

     describe("login user",()=>{
        describe("given the email and password are valid",()=>{
        it('should return a signed accessToken and login the user',async()=>{
         const jwt = signAccessToken(userInput.id)
         supertest(app)
         .post("/api/auth/login")
         .set('Authorization',`Bearer ${jwt}`)
         .send(userInput)
         .expect(200)
        })
    })
})
})