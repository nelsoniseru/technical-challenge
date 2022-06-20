var seeder = require('mongoose-seed');
var bcrypt = require("bcryptjs")
require("dotenv").config()
var data
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_LOCAL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,    
},function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'models/users.js',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['User'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
// hash password
async function hash_password(){
    let password= 'adidasadmin'
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hashSync(password.trim(), salt)
   

// Data array containing seed data - documents organized by Model
 data = [
    {
        'model':'User',
        'documents': [
            {
                'email':'adidas@gmail.com',
                'password':hash,
                'role':'admin'
            },
           
        ]
    }
];
}
 hash_password()