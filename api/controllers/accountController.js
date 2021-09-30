const payment = require('../lib/payment/juno');
const UserDigitalAccount = require('../models/userDigitalAccount')
const AccountResponse = require('../models/accountResponse')




module.exports = {
  //GET BALANCE
  getUserBalance: async (req, res) => {
    try {
      const balance = await payment.balance();

      const obj = {

        total: balance.transferableBalance
      }

      return res.send(obj)

    } catch (err) {
      return res.status(400).send({ err: "error finding balance " })
    }
  },


  //SEND CHARGE
  createCharge: async (req, res) => {
    try {

      const body = req.body;

      const charge = await payment.charge(body);
      res.status(200).json(charge)
    } catch (err) {
      console.log(err.message || err.stack);
    }
  },


  //LIST CHARGES
  listCharges: async (req, res) => {
    try {
      const charges = await payment.listCharges();

      return res.status(200).send(charges)

    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  },


  //STATUS ACCOUNT
  accountStatus: async (req, res) => {
    try {
      const status = await payment.accountStatus();
      res.status(200).send(status)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },


  //CREATE DIGITAL ACCOUNT
  createAccount: async (req, res) => {
    const { email } = req.body;
    try {

      if (await UserDigitalAccount.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });

      } else {
        // criação de conta digital na Juno
        const body = req.body
        const accountCreatedResponse = await payment.createAccount(body);
        //salva resposta no bd
        AccountResponse.create(accountCreatedResponse)


        if (!accountCreatedResponse) {
          return res.status(400).send({ message: "User creating error, cant create a digital account in Juno" })

        } else {
          // criação de conta no bd, somente se sucesso na juno
          const userDigitalAccount = await UserDigitalAccount.create(body)

          return res.status(200).send({
            userDigitalAccount,
            accountCreatedResponse
          })
        }
      }


    } catch (err) {
      return res.status(400).send({ message: err.message })

    }
  },


  //LIST PENDING DOCUMENTS
  listPendingDocuments: async (req, res) => {
    try {
      const pend_docs = await payment.listPendingDocuments();

      res.status(200).send(pend_docs)
    } catch (err) {
      res.json(err)
      console.log(err.message || err.stack)
    }
  },


  //SEND DOCUMENTS
  sendDocuments: async (req, res) => {
    try {
      const send_docs = await payment.sendDocuments();
      console.log(send_docs)
      res.status(200).send(send_docs)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },


  //CARD PAYMENT (INSERT CREDITS)
  cardPayment: async (req, res) => {
    try {
      const body = {
        "chargeId": "chr_17E002209C2B1DA6FA54C8AFBD22883F",
        "billing": {
          "email": "asltolfo.mariano@uol.com.br",
          "address": {
            "street": "rua do Jardim Rodeio",
            "number": "255",
            "complement": "",
            "neighborhood": "Jardim Rodeio",
            "city": "São Paulo",
            "state": "SP",
            "postCode": "08775110"
          },
          "delayed": false
        },
        "creditCardDetails": {
          "creditCardId": "45758ced-e902-49d3-be39-ba21a7775fe7"
        }
      }

      const card_payment = await payment.cardPayment(body)
      console.log(card_payment)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },

  //PIX PAYMENT (INSERT CREDITS)
  pixPayment: async (req, res) => {
    try {
      const body = {
        //preencher
      }
      const pix_payment = await payment.pixPayment(body)
      console.log(pix_payment)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  }

}