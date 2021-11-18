const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require("../models/user");
const UserAccount = require('../models/userAccount');
const UserSession = require('../models/session')
const sgMail = require('@sendgrid/mail')
const sentryError = require('../resources/error-handler');
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
    /* swagger doc
    #swagger.tags = ['Authorization']
    #swagger.summary = "Create a user to login in API"
   
    #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Name, Email and Password.',
           required: true,
           schema: { $ref: "#/definitions/AddUser" }
   }

    #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/UserCreated" },
      description: "New user created." }

    #swagger.responses[400] = { description: 'Something goes wrong' }
    */


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
      await sentryError(err);
      return res.status(err.code || err.status || 400).send(err.message);
    }
  },

  //Login Usuário
  authUser: async (req, res) => {
    // #swagger.tags = ['Authorization']
    // #swagger.summary = 'Login in application.'
    // #swagger.parameters['email'] = { description: 'User Email.', type: 'string', required: true, in:'body' }
    // #swagger.parameters['password'] = { description: 'User password.', type: 'string', required: true, in:'body' }

    try {
      const { email, password } = req.body;

      //encontrar usuario por email e password
      const user = await User.findOne({ email }).select('+password');
      //verifica usuario e senha
      if (!user || !await bcrypt.compare(password, user.password))
        return res.status(400).send({ message: "Usuario ou email incorretos, tente novamente..." });
      //esconde o password
      user.password = undefined

      return res.send({ user, token: generateToken({ id: user.id }) })


    } catch (err) {
      await sentryError(err);
      return res.status(err.code || err.status || 400).send(err.message);
    }
  },

  //Forgot password
  forgotPassword: async (req, res) => {
    //  #swagger.tags = ['Authorization']
    //  #swagger.summary = 'Endpoint to recover password.'
    //  #swagger.parameters['email'] = { description: 'User Email.', type: 'string', required: true, in:'body' }


    try {
      const { email } = req.body;
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
        <div>
        <h2>Olá, aqui é a KapiPay!</h2>
        <h3>Nós recebemos uma solicitação de recuperação de senha.</h3>

        <p>Essa é a chave para redefinição:</p> 
        <p style="color:blue"><strong>${token}<strong></p>
        <hr>

        <p>Copie o código acima e cole na página de recuperação de senha.</p>
        </div>
        `,

      }, (err) => {
        if (err) {
          return res.status(400).send({ message: "Não é possível enviar o email" });
        } else {
          console.log(token)
          return res.status(200).send({ token })
        }
      })

    } catch (err) {
      await sentryError(err);
      return res.status(err.code || err.status || 400).send(err.message);
    }
  },

  //Reset password
  passwordReset: async (req, res) => {
    // #swagger.tags = ['Authorization']
    // #swagger.summary = 'Endpoint to change password.'
    // #swagger.parameters['email'] = { description: 'User Email.', type: 'string', required: true, in:'body' }
    // #swagger.parameters['token'] = { description: 'Token received by email.', type: 'string', required: true, in:'body' }
    // #swagger.parameters['password'] = { description: 'A new user password.', type: 'string', required: true, in:'body' }



    try {
      const { email, token, password } = req.body;
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

      return res.status(200).send({ message: "Senha alterada com sucesso!" })

    } catch (err) {
      // console.log(err.message)
      await sentryError(err);
      return res.status(err.code || err.status || 400).send(err.message);
    }
  },


}