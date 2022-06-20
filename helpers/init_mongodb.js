const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_LOCAL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,    
},).then(()=>{
    console.log("database is connected")
}).catch((err)=>console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db')
})
