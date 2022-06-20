const supertest = require("supertest")
const User = require("../models/users")
const Subscribe = require("../models/users")
const app = require('../server')
const mongoose = require('mongoose')
const {v4:uuidv4} = require('uuid')
const subscribeService = require('./service/subscribe.service')
const authService = require('./service/auth.service')
const {signAccessToken} = require('../helpers/jwt_helper')
const userId = new mongoose.Types.ObjectId().toString()
const id = new mongoose.Types.ObjectId().toString()
const userInput = {
    id:userId,
    email:"nelsoniseru90@gmail.com",
    password:"nelsoniseru@2022"
}

const userSubscriptionInput = {
    id:id,
    email:"nelsoniseru56@gmail.com",
    firstname:"nelsoniseru@2022",
    gender:"male",
    date_of_birth:"12-03-1996",
    newsletter_id:uuidv4(),
    flag_for_content:false

}
const admin = {
    id:userId,
    email:"admin",
    password:"admin",
    role:"admin"
}

// beforeEach(async()=>{
//     await User.deleteMany({})
//     await Subscribe.deleteMany({})
//  })
 
describe("subscribe",()=>{
describe("if user is not logged in",()=>{
it("should return 401",()=>{
   let jwt = ""  
    supertest(app)
    .post("/api/subscribe/create-subscription")
    .set('Authorization',`Bearer ${jwt}`)
    .expect(401)
})
})
describe("subcribe to adidas news letter",()=>{
    it("if the user is logged in",async()=>{
       let jwt = signAccessToken(userInput.id)
      let result = await subscribeService.subscribe(userSubscriptionInput)
        supertest(app)
        .post("/api/subscribe/create-subscription")
        .set('Authorization',`Bearer ${jwt}`)
        .send(result)
        .expect(401)
    })
})


describe("get one specific subscription",()=>{
    it("if the admin user is logged in",async()=>{
       let jwt = signAccessToken(admin.id)
       let result = await subscribeService.findOneSubscription(userSubscriptionInput.id)
       supertest(app)
        .post(`/api/subscribe/get-subscription/${userSubscriptionInput.id}`)
        .set('Authorization',`Bearer ${jwt}`)
        .send(result)
        .expect(200)
    })
})

describe("get all subscription",()=>{
    it("if the admin user is logged in",async()=>{
       let jwt = signAccessToken(admin.id)
       let result = await subscribeService.findAll()
       supertest(app)
        .post(`/api/subscribe/get-subscriptions`)
        .set('Authorization',`Bearer ${jwt}`)
        .send(result)
        .expect(200)
    })
})

describe("cancel subscription",()=>{
    it("if the user is logged in",async()=>{
       let jwt = signAccessToken(userInput.id)
       let result = await subscribeService.cancelSubscription(userSubscriptionInput.email)
       supertest(app)
        .post(`/api/subscribe/cancel-subscription`)
        .set('Authorization',`Bearer ${jwt}`)
        .expect(200)
    })
})
})
