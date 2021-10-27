const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require("../models/user");
const UserAccount = require('../models/userAccount');
const sgMail = require('@sendgrid/mail')
require('dotenv').config()


const API_MAIL_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(API_MAIL_KEY)

const SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY;


//Gerar Token
function generateToken(params = {}) {
  return jwt.sign(params, SECRET_KEY, {
    expiresIn: 86400,
  });
}

module.exports = {

  //Registrar usuário
  createUser: async (req, res) => {
    const { email } = req.body;

    try {
      //verifica se já tem algum user com o mesmo email
      if (await User.findOne({ email })) {
        return res.status(400).send({ message: "Usuário já existe." });
      } else {
        const user = await User.create(req.body);
        //esconde o password
        user.password = undefined;
        return res.status(200).send({
          user,
          token: generateToken({ id: user.id }) //gera token no registro
        });
      }
    } catch (err) {
      return res.status(400).send({ err: "Falha no registro." });
    }
  },



  //Login Usuário
  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      //encontrar usuario por email e password
      const user = await User.findOne({ email }).select('+password');
      if (!user)
        return res.status(400).send({ message: "Usuário não encontrado." });
      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ message: "Senha inválida" });

      //encontrar userAccount por id
      const account = await UserAccount.findOne({ "userId": user._id });
      const resourcetoken = account.junoAccountCreateResponse.resourceToken

      //esconde o password
      user.password = undefined
      res.send({
        user,
        token: generateToken({ id: user.id }),
        resourcetoken
      })
    } catch (err) {
      return console.log(err.message || err.stack)
    }
  },


  //Forgot password
  forgotPassword: async (req, res) => {

    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).send({ message: "Usuário não encontrado." });
      //gera token pra recuperar senha
      const token = crypto.randomBytes(20).toString('hex');
      //tempo de expiração do token
      const now = new Date();
      now.setHours(now.getHours() + 1)
      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      });

      //enviar email
      sgMail.send({
        to: email,
        from: {
          name: "Kapipay",
          email: "davi.bernardo@linkapi.com.br"
        },
        subject: "Password Recover from Kapipay",
        template: 'auth/forgot_password',
        html: `
        <h1>Hello from sendgrid</h1>
        Here is your recovery token ${token}
        `,

      }, (err) => {
        if (err)
          return res.status(400).send({ err: "Não é possível enviar o email", token });

        return res.send(token)
      })

    } catch (err) {
      res.status(400).send({ err: "Erro, tente novamente" })
    }
  },



  //Reset password
  passwordReset: async (req, res) => {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

      if (!user)
        return res.status(400).send({ message: "Usuário não encontrado." });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ message: "Token Inválido." });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ message: "Token expirou, gere um novo" });

      user.password = password;

      await user.save();

      res.status(200).send({ message: 'Senha alterada com sucesso' })



    } catch (err) {
      res.status(400).send({ err: "Não foi possível resetar a senha, tente novamente." });
    }
  },


}