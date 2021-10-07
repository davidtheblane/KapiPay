const path = require('path')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});


// transport.use('compile',hbs({
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./src/resources/mail/'),
//   extName: '.html'
// }))

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('../resources/mail/auth')
  },
  viewPath: path.resolve('../resources/mail/auth'),
  extName: '.html',
}));


module.exports = transport