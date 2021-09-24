const payment = require('../lib/payment/juno');


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

  //LIST CHARGES
  listCharges: async (req, res) => {
    try {
      const charges = await payment.listCharges();

      // const obj = {
      // amount: charges[1]
      // dueDate: charges.dueDate,
      // status: charges.status
      // }
      return res.send(charges)

    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  },

  //SEND CHARGE
  charge: async (req, res) => {
    try {
      const body = {
        "charge": {
          "description": "inclusao de creditos na conta",
          "references": [
            "1"
          ],

          "amount": 350,
          "dueDate": "2021-10-02",
          "installments": 1,
          "maxOverdueDays": 2,
          "fine": 0,
          "interest": "0.00",
          "discountAmount": "0.00",
          "discountDays": -1,
          "paymentTypes": [
            "CREDIT_CARD"
          ],
          "paymentAdvance": true
        },
        "billing": {
          "name": "Astolfo Mariano",
          "document": "48827407880",
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

          "notify": false
        }
      };
      const charge = await payment.charge(body);
      console.log(charge);
    } catch (err) {
      console.log(err.message || err.stack);
    }
  },

  //STATUS ACCOUNT
  accountStatus: async (req, res) => {
    try {
      const status = await payment.accountStatus();
      console.log(status)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },

  //CREATE DIGITAL ACCOUNT
  createAccount: async (req, res) => {
    try {
      const body = {
        "type": "PAYMENT",
        "name": "Adalberto Nogueira",
        "document": "61765022843",
        "email": "adalberto.nogueira@bol.com.br",
        "birthDate": "1987-03-22",
        "phone": "5511999909900",
        "businessArea": 1000,
        "linesOfBusiness": "PersonalBusiness",
        "motherName": "Maria Antonieta Nogueira",
        "address": {
          "street": "Rua Piraporinha",
          "number": "299",
          "complement": "",
          "neighborhood": "Jardim Rodeio",
          "city": "São Paulo",
          "state": "SP",
          "postCode": "08775110"
        },
        "bankAccount": {
          "bankNumber": "001",
          "agencyNumber": "12345",
          "accountNumber": "756895",
          "accountType": "CHECKING",
          "accountHolder": {
            "name": "Adalberto Nogueira",
            "document": "61765022843"
          }
        },
        "emailOptOut": false,
        "autoTransfer": false,
        "socialName": false,
        "monthlyIncomeOrRevenue": 10000
      }
      const create_account = await payment.createAccount(body);
      console.log(create_account);
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },


  //LIST PENDING DOCUMENTS
  listPendingDocuments: async (req, res) => {
    try {
      const pend_docs = await payment.listPendingDocuments();
      console.log("pend_docs")
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },


  //SEND DOCUMENTS
  sendDocuments: async (req, res) => {
    try {
      const send_docs = await payment.sendDocuments();
      console.log(send_docs)
    } catch (err) {
      console.log(err.message || err.stack)
    }
  },


  //CARD PAYMENT
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
  }




}

