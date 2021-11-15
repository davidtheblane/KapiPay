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
        console.log(balance.balance)
        res.send(balance)
      }
    } catch (err) {
      sentryError(err);
      // res.status(err.code || err.status || 400).send({ err: err.code, message: err.message });
      res.status(err.status || 400).send({ err: err.message });

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
        // console.log(status)
        return res.status(200).send(status)
      }

    } catch (err) {
      sentryError(err);
      console.log(err)
      return res.status(err.status || 400).send({ message: "err.message" });
    }
  },

  //LIST CHARGES
  // listCharges: async (req, res) => {
  //   const authorization = req.headers.authorization.split(" ")
  //   const token = authorization[1]
  //   try {
  //     //FINDING COLLECTIONS 
  //     const userSession = await MySession.findOne({ "session.token": token })// puxando session do usuario 
  //     const userSessionToken = userSession.session.token //token do usuario logado
  //     const userSessionEmail = userSession.session.userEmail //email do usuario logado
  //     if (!(userSessionToken == token)) { //verificando de usuario pelo token
  //       console.log('Usuario Não Identificado')
  //     } else {
  //       console.log('Usuario Identificado')

  //       const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
  //       const loggedUserId = userModel._id //puxando id do usuario logado

  //       const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
  //       const userInvoices = await UserInvoice.find({ userAccountId: loggedUserId })
  //       const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

  //       //ACTION
  //       const response = await payment.listCharges(resourcetoken);

  //       const charges = response.map(item => {
  //         let charge = {
  //           id: item.id,
  //           code: item.code,
  //           status: item.status,
  //           junoBilletDetails: item.billetDetails,
  //           payments: item.payments
  //         }
  //         return charge
  //       })
  //       // console.log(charges[0])

  //       // const invoicesUpdated = await UserInvoice.find({ "invoiceInfo": charges })
  //       // console.log("invoices", invoicesUpdated)

  //       return res.status(200).send(charges)
  //     }


  //   } catch (err) {
  //     console.log(err)
  //     return res.status(err.status || 400).send(err);
  //   }
  // },

  listInvoices: async (req, res) => {
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
        const userInvoices = await UserInvoice.find({ userAccountId: loggedUserId })

        return res.status(200).send(userInvoices)
      }


    } catch (err) {
      console.log(err)
      return res.status(err.status || 400).send(err);
    }
  },


  //LIST CHARGE by Charge Id
  invoiceById: async (req, res) => {
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
  createInvoice: async (req, res) => {
    try {
      const authorization = req.headers.authorization.split(" ")
      const token = authorization[1]
      const { data } = req.body
      //FINDING COLLECTIONS 
      const userSession = await MySession.findOne({ "session.token": token })// puxando session do usuario 
      const userSessionToken = userSession.session.token //token do usuario logado
      const userSessionEmail = userSession.session.userEmail //email do usuario logado
      if (!(userSessionToken == token)) { //verificando usuario pelo token
        console.log('Usuario Não Identificado')
      } else {
        console.log('Usuario Identificado')

        const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
        const loggedUserId = userModel._id //puxando id do usuario logado

        const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
        const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

        // ACTION
        // formatando o objeto para envio à juno
        const obj = {
          charge: {
            description: data.description,
            amount: data.amount,
            dueDate: data.dueDate,
            paymentAdvance: true,
            paymentTypes: ['CREDIT_CARD', 'BOLETO'],
          },
          billing: {
            name: userModel.name,
            document: userModel.document,
            email: userModel.email,
            address: userModel.address,
            notify: false
          }
        }
        const response = await payment.charge(obj, resourcetoken);
        // formatando o objeto para armazenar no bd
        const invoiceInfo = {
          id: response.id,
          code: response.code,
          status: response.status,
          companyName: data.companyName,
          amount: data.amount,
          dueDate: data.dueDate,
          barcodeNumber: data.barcodeNumber,
          description: data.description,
          junoBilletDetails: response.billetDetails
        }

        if (UserInvoice.find({ userAccountId: loggedUserId })) {
          await UserInvoice.create({ invoiceInfo: invoiceInfo, userAccountId: loggedUserId })

          res.status(200).send(invoiceInfo)
        }

      }
    } catch (err) {
      sentryError(err);
      return res.status(400).send(err);
    }
  },


  //CARD PAYMENT (INSERT CREDITS)
  cardPayment: async (req, res) => {
    try {
      // FINDING COLLECTIONS 
      const userSession = await MySession.find({})// puxando session do usuario 
      const userSessionEmail = userSession[0].session.userEmail //email do usuario logado

      const userModel = await User.findOne({ email: userSessionEmail }) //puxando registro do usuario logado
      const loggedUserId = userModel._id //puxando id do usuario logado

      const userAccountModel = await UserAccount.findOne({ userId: loggedUserId }) // puxando conta digital do usuario logado
      const resourcetoken = userAccountModel.junoAccountCreateResponse.resourceToken //puxando resourcetoken do usuario

      //  ACTIONS
      const { chargeId } = req.body;
      console.log(chargeId)
      const userInvoice = await UserInvoice.findOne({ "invoiceInfo.id": chargeId }) //invoice do usuario
      const invoiceChargeId = userInvoice.invoiceInfo.id //identificador de cobrança


      if (userModel) {
        if (invoiceChargeId) {
          const data = {
            chargeId: invoiceChargeId,
            billing: {
              email: userModel.email,
              address: userModel.address,
              delayed: false,
            },
            creditCardDetails: {
              creditCardId: userAccountModel.cardToken.creditCardId,
            }
          }
          const response = await payment.cardPayment(data, resourcetoken)
          const paid = await UserInvoice.findOneAndUpdate({ "invoiceInfo.id": chargeId }, { paymentInfo: response, "invoiceInfo.status": "PAID" });

          return res.status(200).send(paid)
        } else {
          return res.status(400).send({ message: 'Cobrança não existe' })
        }

      } else {
        return res.status(400).send({ message: 'Usuario não existe.' })
      }

    } catch (err) {
      sentryError(err);
      return res.status(err.status || 400).send(err.response);
    }
  },

  //USER BANK ACCOUNT
  bankAccount: async (req, res) => {
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

        //  ACTIONS
        const { bankAccount } = req.body;
        console.log(bankAccount)

        if (userModel) {
          console.log('usermodel existe')
          const userBankAccount = await UserAccount.findOneAndUpdate({ "userId": loggedUserId }, { bankAccount: bankAccount });

          return res.status(200).send(userBankAccount)
        } else {
          return res.status(400).send({ message: 'Usuario não existe.' })
        }
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

      if (loggedUserId) {
        // console.log(req.body)
        const response = await payment.billPayment(req.body, resourcetoken);
        // if (UserInvoice.find({ userAccountId: userModel._id })) {
        //   const invoice = await UserInvoice.create({ invoiceInfo: response, userAccountId: userModel._id })

        res.status(200).send(response)
      } else {
        console.log('usuario sem registro')
        return res.status(400).send({ message: "Usuário não tem registro." });
      }

    } catch (err) {
      sentryError(err);
      // console.log(err.response.data)
      return res.status(err.status || 400).send(err.response.creditCardDetails);
    }
  },


  //SALVAR CARTÃO - (TOKENIZAR)
  saveCard: async (req, res) => {
    const creditCardHash = req.body
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
        const response = await payment.cardTokenize(creditCardHash, resourcetoken)
        await UserAccount.findOneAndUpdate({ userId: loggedUserId, cardToken: response })

        console.log(response)
        return res.status(200).send({ message: "Cartão cadastrado com sucesso!" })

      }
    } catch (err) {
      return res.status(err.status || 400).send(err);
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
        await UserAccount.findOneAndUpdate({ userId: loggedUserId }, { docId: response[0].id, selfieId: response[1].id })

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
        const file = req.body.formData;
        // console.log(file)
        // const file = req.files // envio do Insomnia
        // acessando o id do doc correto no banco de dados
        if (req.params.id == 'doc') {
          let id = userAccountModel.docId
          const response = await payment.sendDocuments(file, id, resourcetoken);
          return res.status(200).send(response)
        }
        else if (req.params.id == 'selfie') {
          let id = userAccountModel.selfieId
          const response = await payment.sendDocuments(file, id, resourcetoken);
          return res.status(200).send(response)
        }
      }
    } catch (err) {
      console.log(err)
      return res.status(err.status || 400).send(err);
    }
  },


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