const payment = require('../resources/lib/payment/juno');
const User = require('../models/user');
const UserAccount = require('../models/userAccount')



module.exports = {

  //GET BALANCE
  getUserBalance: async (req, res) => {
    try {
      const balance = await payment.balance(req.headers.resourcetoken);
      return res.status(200).send(balance)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
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
    try {
      const charge = await payment.charge(req.body, req.headers.resourcetoken);
      res.status(200).send(charge)

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
      // confirmando existencia do usuario
      if (await User.findOne({ email })) {
        console.log('usuario existe, criando conta...')
        // criando conta digital
        // const accountCreatedResponse = await payment.createAccount(req.body);

        // atualizando collection User com dados enviados
        console.log("atualizando model de usuario...")
        const userData = await User.updateOne({ email }, { ...req.body })
        console.log("atualizou! model de usuario...!")


        //pegando referencia de User._id e passando pra userId
        const userId = await User.findOne({ _id })

        // atualizando collection UserAccount no bd 
        const accountData = await UserAccount.create({ userId: userId }, { ...req.body })
        // const accountData = await UserAccount.create({ userId: _id }, { ...req.body, junoResponse: accountCreatedResponse })



        console.log(`user data ${{ userData: { userData } }}`)
        console.log(`account data ${JSON.stringify(accountData)}`)

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