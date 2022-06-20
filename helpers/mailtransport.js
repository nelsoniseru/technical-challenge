const nodemailer = require('nodemailer');
require("dotenv").config()
const transporter = nodemailer.createTransport({
  host:process.env.HOST,
  port: process.env.MAILPORT,
 secure:true,
  logger:true,
  debug:true,
 
  auth: {
      user:process.env.USER_NAME,
      pass:process.env.PASSWORD
  },
  tls: {
      // do not fail on invalid certs
      rejectUnauthorized:true
  }
});

// send email
exports.sendMail = (mailto,cc,bcc,subject,body,attachments) => {transporter.sendMail({
from:process.env.USER_NAME,
to: mailto,
subject: subject,
html: body,
cc:cc,
bcc:bcc,
attachments:attachments
})
};



