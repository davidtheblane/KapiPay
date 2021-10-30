const payment = require('../resources/lib/payment/juno');
const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const UserInvoice = require('../models/userInvoice')

module.exports = {

  //GET BALANCE
  getUserBalance: async (req, res) => {
    try {
      const balance = await payment.balance(req.headers.resourcetoken);
      res.send(balance)
    } catch (err) {
      sentryError(err);
      res.status(err.code || err.status || 400).send({
        error: err.code,
        message: err.message
      });
    }
  },

  //STATUS ACCOUNT
  accountStatus: async (req, res) => {
    try {
      const status = await payment.accountStatus(req.headers.resourcetoken);
      return res.status(200).send(status)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },

  //LIST CHARGES
  listCharges: async (req, res) => {

    try {
      const charges = await payment.listCharges(req.headers.resourcetoken);
      return res.status(200).send(charges)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //LIST CHARGE by Charge Id
  chargeByChargeId: async (req, res) => {

    try {
      const charge = await payment.chargeById(req.params.id, req.headers.resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //SEND CHARGE
  createCharge: async (req, res) => {
    try {
      const { email } = req.body.billing;
      const userModel = await User.findOne({ email })

      if (userModel) {
        const response = await payment.charge(req.body, req.headers.resourcetoken);

        if (UserInvoice.find({ userAccountId: userModel._id })) {
          const invoice = await UserInvoice.create({ invoiceInfo: response, userAccountId: userModel._id })

          res.status(200).send(invoice)
        }
      } else {
        return res.status(400).send({ message: "Usuário não tem registro." });
      }

    } catch (err) {
      sentryError(err);
      return res.status(400).send({ message: err.message });
    }
  },


  //CARD PAYMENT (INSERT CREDITS)
  cardPayment: async (req, res) => {
    try {
      const { email } = req.body.billing;
      const userModel = await User.findOne({ email })
      const { chargeId } = req.body;
      const userInvoice = await UserInvoice.findOne({ "invoiceInfo.id": chargeId }) //invoice do usuario
      const invoiceChargeId = userInvoice.invoiceInfo.id //identificador de cobrança


      if (userModel) {
        if (invoiceChargeId) {
          const response = await payment.cardPayment(req.body, req.headers.resourcetoken)
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


  //SALVAR CARTÃO - (TOKENIZAR)
  saveCard: async (req, res) => {
    // const { email } = req.body;
    try {
      const card_token = await payment.cardTokenize(req.body, req.headers.resourcetoken)
      // const saveCardOnUser = await User.updateOne({ email }, { ...req.body, cardHash: card_token })
      return res.status(200).send(card_token)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //CREATE DIGITAL ACCOUNT
  createAccount: async (req, res) => {
    try {
      const { email } = req.body; // selecionando o campo email nos dados inseridos
      const userModel = await User.findOne({ email }) // criando uma pesquisa por email dentro da model User

      // confirmando existencia do usuario pelo email
      if (userModel) {
        // chamando função de criação de conta digital
        const response = await payment.createAccount(req.body);

        // encontrando usuario pelo email e atualizando
        const userData = await User.findOneAndUpdate({ email }, { ...req.body })

        // filtrando se o usuario existe pelo campo id das users models 
        if (UserAccount.find({ userId: userModel._id })) {
          //criando a document no bd, enviando dados inserios e reposta da juno
          const accountData = await UserAccount.create({ ...req.body, userId: userModel._id, junoAccountCreateResponse: response })

          return res.status(200).send({
            userData,
            accountData
          })
        } else {
          return res.status(400).send({ message: "Usuário não encontrado." })
        }
      } else {
        return res.status(400).send({ message: "Usuário não tem registro na aplicação." });
      }

    } catch (err) {
      sentryError(err);
      // return res.status(err.status || 400).send({ message: err });
      console.log(err)
      return res.status(err.code || err.status || 400).send(err.details);
    }

  },


  //LIST PENDING DOCUMENTS
  listPendingDocuments: async (req, res) => {
    try {
      const pend_docs = await payment.listPendingDocuments(req.headers.resourcetoken);
      return res.status(200).send(pend_docs)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //SEND DOCUMENTS
  sendDocuments: async (req, res) => {
    try {
      const send_docs = await payment.sendDocuments(req.files, req.params.id, req.headers.resourcetoken);
      console.log(req.params.id)
      return res.status(200).send(send_docs)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.message });
    }
  },


  //PAGAMENTO DE CONTAS
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
      return res.status(err.status || 400).send({ message: err.message });
    }
  }

}