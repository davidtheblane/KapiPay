const payment = require('../resources/lib/payment/juno');
const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const UserInvoice = require('../models/userInvoice');
const MySession = require('../models/session');

module.exports = {

  //Listar todos usuários - vai ser apenas admin
  listUsers: async (req, res) => {
    try {
      const user = await User.find({});
      return res.status(200).send({ user })
    } catch (error) {
      return res.status(400).send({ error: "Cannot find users" })
    }
  },

  //Listar Usuário por ID - vai ser apenas admin
  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      return res.status(200).send({ user })
    } catch (error) {
      return res.status(400).send({ error: `Cannot find user id: ${id}` })
    }
  },


  //Listar Dados do Usuário
  userData: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
    console.log(token)
    try {
      //FINDING COLLECTIONS
      const userSession = await MySession.findOne({ "session.token": token })// puxando session do usuario 
      const userSessionToken = userSession.session.token //token do usuario logado
      const userSessionEmail = userSession.session.userEmail //email do usuario logado
      if (!(userSessionToken == token)) { //verificando de usuario pelo token
        console.log('Usuario Não Identificado')
      } else {
        console.log('Usuario Identificado')

        const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
        const loggedUserId = userModel._id //puxando id do usuario logado

        const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado

        //ACTION
        userProfile = {
          name: userModel.name,
          email: userModel.email,
          address: userModel.address,
          birthDate: userModel.birthDate,
          document: userModel.document,
          monthlyIncomeOrRevenue: userModel.monthlyIncomeOrRevenue,
          phone: userModel.phone,
          bankAccount: userAccountModel.bankAccount
        }

        console.log(userProfile)

        return res.status(200).send(userProfile)
      }

      const user = await User.findById(id);
      return res.status(200).send({ user })

    } catch (err) {
      sentryError(err);
      console.log(err)
      return res.status(err.status || 400).send(err);
    }

  }
}