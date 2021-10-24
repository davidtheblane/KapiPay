const payment = require('../resources/lib/payment/juno');
const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const Sentry = require("@sentry/node")

module.exports = {

  //GET BALANCE
  getUserBalance: async (req, res) => {
    try {
      const balance = await payment.balance(req.headers.resourcetoken);
      res.send(balance)
    } catch (err) {
      Sentry.captureException(err)
      res.status(err.code || err.status || 400).send({
        error: err.code,
        message: err
      });
    } finally {
      req.transaction.finish();
    }
  },

  //STATUS ACCOUNT
  accountStatus: async (req, res) => {
    try {
      const status = await payment.accountStatus(req.headers.resourcetoken);
      return res.status(200).send(status)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },

  //LIST CHARGES
  listCharges: async (req, res) => {

    try {
      const charges = await payment.listCharges(req.headers.resourcetoken);
      return res.status(200).send(charges)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //LIST CHARGE by Charge Id
  chargeByChargeId: async (req, res) => {

    try {
      const charge = await payment.chargeById(req.params.id, req.headers.resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //SEND CHARGE
  createCharge: async (req, res) => {
    const data = ({ body } = req)
    const resourcetoken = "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
    // const token = ({ resourcetoken } = req.headers)

    try {
      const charge = await payment.charge(data, req.headers.resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //CARD PAYMENT (INSERT CREDITS)
  cardPayment: async (req, res) => {
    try {
      const card_payment = await payment.cardPayment(req.body, req.headers.resourcetoken)
      return res.status(200).send(card_payment)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },

  //SALVAR CARTÃO - (TOKENIZAR)
  saveCard: async (req, res) => {
    // const { email } = req.body;
    try {
      const card_token = await payment.cardTokenize(req.body, req.headers.resourcetoken)
      // const saveCardOnUser = await User.updateOne({ email }, { ...req.body, cardHash: card_token })
      return res.status(200).send(card_token)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },

  ////CREATE DIGITAL ACCOUNT
  // createAccount: async (req, res) => {
  //   const { email } = req.body;


  //   try {
  //     if (await User.findOne({ email })) {
  //       // criação de conta digital
  //       const accountCreatedResponse = await payment.createAccount(req.body);

  //       // criação de conta no bd, somente se sucesso
  //       // fazer uma validação aqui para evitar duplicidade
  //       const userDigitalAccount = await User.updateOne({ email }, { ...req.body, junoResponse: accountCreatedResponse })

  //       return res.status(200).send({
  //         accountCreatedResponse,
  //         userDigitalAccount
  //       })
  //     }
  //     return res.status(400).send({ error: "User does not exist" });

  //   } catch (err) {
  //     return res.status(err.status || 400).send({ message: err });

  //   }
  // },

  ///////////

  //TESTE NEW IMPLEMENTATION
  //CREATE DIGITAL ACCOUNT
  createAccount: async (req, res) => {

    try {
      const { email } = req.body;
      const userModel = await User.findOne({ email })

      // confirmando existencia do usuario
      if (userModel) {
        // criando conta digital
        // const accountCreatedResponse = await payment.createAccount(req.body);
        // if (accountCreatedResponse.ok) { return "Conta foi criada" || console.log("conta criada") }
        // console.log('pré cadastro ok, conta digital criada...')

        // atualizando collection User com dados enviados
        const userData = await User.findOneAndUpdate({ email }, { ...req.body })
        console.log("userData collection atualizado...!")

        // atualizando collection UserAccount no bd 
        // const accountData = await UserAccount.create({ userId: userModel._id }, { ...req.body })
        // const accountData = await UserAccount.create({ userId: userModel._id }, { ...req.body, junoResponse: accountCreatedResponse })
        console.log("accountData collection atualizado...!")

        return res.status(200).send({
          // accountCreatedResponse,
          userData,
          accountData
        })
      } else {
        return res.status(400).send({ error: "Usuário não tem registro" });
      }

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }

  },


  //LIST PENDING DOCUMENTS
  listPendingDocuments: async (req, res) => {
    try {
      const pend_docs = await payment.listPendingDocuments(req.headers.resourcetoken);
      return res.status(200).send(pend_docs)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //SEND DOCUMENTS
  sendDocuments: async (req, res) => {
    try {
      const send_docs = await payment.sendDocuments(req.files, req.params.id, req.headers.resourcetoken);
      console.log(req.params.id)
      return res.status(200).send(send_docs)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  // //PAGAMENTO DE CONTAS
  // billPayment: async (req, res) => {
  //   try {
  //     const body = req.body
  //     const pix_payment = await payment.billPayment(body, req.headers.resourcetoken)
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
      return res.status(err.status || 400).send({ message: err });
    }
  }

}