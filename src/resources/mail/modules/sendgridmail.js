const sgMail = require('@sendgrid/mail')

const API_MAIL_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(API_MAIL_KEY)

const message = {
  to: 'davidtheblane@gmail.com',
  from: {
    name: "Kapipay",
    email: "davi.bernardo@linkapi.com.br"
  },
  subject: "Hello from sendgrid",
  text: "Hello from sendgrid",
  html: "<h1>Hello from sendgrid</h1>"
};

sgMail.send(message)
  .then(response => console.log('Email sent...'))
  .catch(err => console.log(err.message));

module.exports = sgMail