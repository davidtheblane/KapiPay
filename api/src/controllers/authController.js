const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../resources/mail/modules/mailer')
const User = require("../models/user");

require('dotenv').config()

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
        return res.status(400).send({ error: "User already exists" });
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
      return res.status(400).send({ error: "Registration failed" });
    }
  },



  //Login Usuário
  authUser: async (req, res) => {
    const { email, password } = req.body;
    console.log('chegou aqui')

    try {
      //encontrar usuario por email e password
      const user = await User.findOne({ email }).select('+password');
      if (!user)
        return res.status(400).send({ error: "User not found" });
      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: "Invalid password" });

      //esconde o password
      user.password = undefined
      res.send({
        user,
        token: generateToken({ id: user.id }),
        message: console.log("chegou na rota")
      })
    } catch (e) {
      console.log(e.message || e.stack)
    }
  },


  //Forgot password
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).send({ error: "user not found" });
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
      mailer.sendMail({
        to: email,
        from: "davi.bernardo@uol.com.br",
        template: 'auth/forgot_password',
        context: { token },
      }, (err) => {
        if (err)
          return res.status(400).send({ error: "Cannot send forgot password email", token });

        return res.send()
      })

    } catch (err) {
      res.status(400).send({ error: "Erro on forgot password, try again" })
    }
  },


  //Reset password
  passwordReset: async (req, res) => {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

      if (!user)
        return res.status(400).send({ error: "user not found" });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: "Invalid token" });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: "Token expired, generate a new one" });

      user.password = password;

      await user.save();

      res.send('ok, senha alterada')



    } catch (err) {
      res.status(400).send({ error: "Cannot reset password, try again" });
    }
  },


}