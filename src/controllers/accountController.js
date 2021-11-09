const payment = require('../resources/lib/payment/juno');
const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const UserInvoice = require('../models/userInvoice');
const MySession = require('../models/session');


module.exports = {

  //GET BALANCE
  getUserBalance: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

        //ACTION
        const balance = await payment.balance(resourcetoken);
        console.log(balance)
        res.send(balance)
      }
    } catch (err) {
      sentryError(err);
      // res.status(err.code || err.status || 400).send({ err: err.code, message: err.message });
      res.status(err.status || 400).send({ message: err.message });

    }
  },

  //STATUS ACCOUNT
  accountStatus: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
    try {
      //FINDING COLLECTIONS
      // const userSession = await MySession.find({ "[0].session": token })// puxando session do usuario 
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
        //ACTION
        const status = await payment.accountStatus(resourcetoken);
        console.log(status)
        return res.status(200).send(status)
      }

    } catch (err) {
      sentryError(err);
      console.log(err)
      return res.status(err.status || 400).send({ message: "err.message" });
    }
  },

  //LIST CHARGES
  listCharges: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
        //ACTION
        const response = await payment.listCharges(resourcetoken);
        const chargeId = response.charges[0].id
        console.log(response)
        return res.status(200).send(response)
      }
      // ESTA DANDO ERRO DE SESSION NULL NO INSOMNIA, FAZER A CHAMADA PELO NAVEGADOR

      // if (UserInvoice.find({ userAccountId: loggedUserId })) {
      //   const charges = await UserInvoice.updateMany({ "invoiceInfo.id": chargeId, userAccountId: loggedUserId })
      //   return res.status(200).send(response.charges[0])
      // } else {
      //   console.log('erro')
      // }

    } catch (err) {
      console.log(err)
      return res.status(err.status || 400).send(err);
    }
  },


  //LIST CHARGE by Charge Id
  chargeByChargeId: async (req, res) => {
    try {
      //FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario 
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
      const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
      //ACTION
      const charge = await payment.chargeById(req.params.id, resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //SEND CHARGE
  createCharge: async (req, res) => {
    const data = req.body
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

        //  ACTION
        if (loggedUserId) {
          const response = await payment.charge(data, resourcetoken);

          if (UserInvoice.find({ userAccountId: userModel._id })) {
            const invoice = await UserInvoice.create({ invoiceInfo: response, userAccountId: userModel._id })

            res.status(200).send(invoice)
          }
        } else {
          return res.status(400).send({ message: "Usuário não tem registro." });
        }
      }
    } catch (err) {
      sentryError(err);
      return res.status(400).send({ message: err });
    }
  },


  //CARD PAYMENT (INSERT CREDITS)
  cardPayment: async (req, res) => {
    try {
      //FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario 
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
      const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
      //  ACTIONS
      // const { email } = req.body.billing;
      // const userModel = await User.findOne({ email })
      const { chargeId } = req.body;
      const userInvoice = await UserInvoice.findOne({ "invoiceInfo.id": chargeId }) //invoice do usuario
      const invoiceChargeId = userInvoice.invoiceInfo.id //identificador de cobrança


      if (userModel) {
        if (invoiceChargeId) {
          const response = await payment.cardPayment(req.body, resourcetoken)
          const paid = await UserInvoice.findOneAndUpdate({ "invoiceInfo.id": chargeId }, { paymentInfo: response });

          return res.status(200).send(paid)
        } else {
          return res.status(400).send({ message: 'Cobrança não existe' })
        }

      } else {
        return res.status(400).send({ message: 'Usuario não existe.' })
      }

    } catch (err) {
      sentryError(err);
      return res.status(err.status || 400).send({ message: err.message });
    }
  },

  //USER BANK ACCOUNT
  bankAccount: async (req, res) => {
    try {
      //FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario 
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado


      //  ACTIONS
      // const { email } = req.body.billing;
      // const userModel = await User.findOne({ email })
      const { bankAccount } = req.body;
      console.log(bankAccount)

      if (userModel) {
        console.log('usermodel existe')
        const userBankAccount = await UserAccount.findOneAndUpdate({ "userId": loggedUserId }, { bankAccount: bankAccount });

        return res.status(200).send(userBankAccount)
      } else {
        return res.status(400).send({ message: 'Usuario não existe.' })
      }

    } catch (err) {
      sentryError(err);
      return res.status(err.status || 400).send({ message: err.message });
    }
  },

  //BILL PAYMENT
  billPayment: async (req, res) => {
    try {
      //FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario 
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
      const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
      //  ACTION
      // const { email } = req.body.billing;
      // const userModel = await User.findOne({ email })

      if (loggedUserId) {
        const response = await payment.billPayment(req.body, resourcetoken);
        console.log("chegou aqui")
        console.log(response.data)

        // if (UserInvoice.find({ userAccountId: userModel._id })) {
        //   const invoice = await UserInvoice.create({ invoiceInfo: response, userAccountId: userModel._id })

        res.status(200).send(response.data)
      } else {
        console.log('usuario sem registro')
        return res.status(400).send({ message: "Usuário não tem registro." });
      }

    } catch (err) {
      sentryError(err);
      return res.status(400).send(err);
    }
  },


  //SALVAR CARTÃO - (TOKENIZAR)
  saveCard: async (req, res) => {
    try {
      //FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
      const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
      //  ACTIONS
      // const { email } = req.body;
      const card_token = await payment.cardTokenize(req.body, req.headers.resourcetoken)
      // const saveCardOnUser = await User.updateOne({ email }, { ...req.body, cardHash: card_token })
      return res.status(200).send(card_token)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //CREATE DIGITAL ACCOUNT
  createAccount: async (req, res) => {
    const { email } = req.body; // selecionando o campo email nos dados inseridos
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
    try {
      //FINDING COLLECTIONS
      const userSession = await MySession.findOne({ "session.token": token })// puxando session do usuario
      const userSessionToken = userSession.session.token //token do usuario logado
      const userSessionEmail = userSession.session.userEmail //email do usuario logado

      if (!(userSessionToken == token)) { //verificando de usuario pelo token
        console.log('Usuario Não Identificado')
      } else {
        console.log('Usuario Identificado')

        // ACTIONS
        const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado

        if (userModel) {
          // encontrando usuario pelo email e atualizando
          const userData = await User.findOneAndUpdate({ email }, { ...req.body })

          // filtrando se o usuario existe pelo campo id das users models 
          if (UserAccount.find({ userId: userModel._id })) {
            // chamando função de criação de conta digital
            const response = await payment.createAccount(req.body);

            //criando a document no bd, enviando dados inserios e reposta da juno
            const accountData = await UserAccount.create({ ...req.body, userId: userModel._id, junoAccountCreateResponse: response })

            console.log({ userData, accountData })
            return res.status(200).send({ message: "Conta criada com sucesso!", userData: userData, accountData: accountData })
          } else {
            return res.status(400).send({ message: "Usuário não encontrado." })
          }
        } else {
          return res.status(400).send({ message: "Usuário não tem registro na aplicação." });
        }
      }

    } catch (err) {
      sentryError(err);
      console.log(err)
      return res.status(err.code || err.status || 400).send(err.message);
    }

  },


  //LIST PENDING DOCUMENTS
  listPendingDocuments: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
        //  ACTIONS
        const response = await payment.listPendingDocuments(resourcetoken);

        //salvand o id dos documentos no bd
        await UserAccount.findOneAndUpdate({ userId: loggedUserId, docId: response[0].id, selfieId: response[1].id })

        return res.status(200).send(response)
      }
    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //SEND DOCUMENTS
  sendDocuments: async (req, res) => {
    const authorization = req.headers.authorization.split(" ")
    const token = authorization[1]
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
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

        //  ACTIONS
        //acessando o id do doc correto no banco de dados
        if (req.params.id == 'doc') {
          let id = userAccountModel.docId
          console.log(id)
          const response = await payment.sendDocuments(req.files, id, resourcetoken);
          return res.status(200).send(response)
        }
        else if (req.params.id == 'selfie') {
          let id = userAccountModel.selfieId
          console.log(id)
          const response = await payment.sendDocuments(req.files, id, resourcetoken);
          return res.status(200).send(response)
        }
      }
    } catch (err) {
      console.log(err)
      return res.status(err.status || 400).send(err);
    }
  },


  //PAGAMENTO DE CONTAS
  // billPayment: async (req, res) => {
  //   try {
  //FINDING COLLECTIONS 
  // const userSession = await MySession.find({})// puxando session do usuario 
  //    const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

  //    const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
  //    const loggedUserId = userModel._id //puxando id do usuario logado

  //    const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
  //    const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario
  //  ACTIONS
  //     const body = req.body
  //     const pix_payment = await payment.billPayment(body, resourcetoken)
  //     console.log(pix_payment)
  //   } catch (err) {
  //     return res.status(err.status || 400).send({ message: err });
  //   }
  // },




  //PIX PAYMENT (INSERT CREDITS)
  pixPayment: async (req, res) => {
    try {
      const body = req.body
      const pix_payment = await payment.pixPayment(body)
      console.log(pix_payment)
    } catch (err) {
      console.log(err.message || err.stack)
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


}