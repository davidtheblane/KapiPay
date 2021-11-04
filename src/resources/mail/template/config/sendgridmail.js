// const sgMail = require('@sendgrid/mail')
// const User = require("../models/user");


// const API_MAIL_KEY = process.env.SENDGRID_API_KEY;
// sgMail.setApiKey(API_MAIL_KEY)

// const user = await User.findOne({ email });
// await User.findByIdAndUpdate(user.id, {
//   '$set': {
//     passwordResetToken: token,
//     passwordResetExpires: now,
//   }
// });

// const message = {
//   to: email,
//   from: {
//     name: "Kapipay",
//     email: "davi.bernardo@linkapi.com.br"
//   },
//   subject: "Password Recover from Kapipay",
//   template: 'auth/forgot_password',
//   html: `
//         <h1>Hello from sendgrid</h1>
//         Here is your recovery token ${token}`,
// };

// sgMail.send(message), (err) => {
//   if (err) {
//     return res.status(400).send({ err: "Não é possível enviar o email", token });
//   } else {
//     return res.send(token)
//   }
// }



// module.exports = sgMail


// const message = {
//   to: 'davidtheblane@gmail.com',
//   from: {
//     name: "Kapipay",
//     email: "davi.bernardo@linkapi.com.br"
//   },
//   subject: "Hello from sendgrid",
//   text: "Hello from sendgrid",
//   html: "<h1>Hello from sendgrid</h1>"
// };

// sgMail.send(message)
//   .then(response => console.log('Email sent...'))
//   .catch(err => console.log(err.message));