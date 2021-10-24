const payment = require('../resources/lib/payment/juno');
// const invoicePay = require('../resources/lib/payment/invoice')
const Company = require('../models/company');
const Invoice = require('../models/invoice')
const AccountController = require('../controllers/accountController')



module.exports = {

  //GET INVOICES
  invoices: async (req, res) => {
    try {
      const invoices = await Invoice.findOne(req.body)
      return res.status(200).send(invoices)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err || "Faturas não encontradas" });
    }
  },

  //GET INVOICE BY ID
  invoiceById: async (req, res) => {
    try {
      const status = await payment.accountStatus(req.headers.resourcetoken);
      return res.status(200).send(status)

    } catch (err) {

      return res.status(err.status || 400).send({ message: err });
    }
  },

  //INVOICE INSERTION
  invoiceInsert: async (req, res) => {
    const { charge } = req.body

    try {
      const createNewInvoice = await payment.charge(req.body, req.headers.resourcetoken);

      // const storeInvoice = await Invoice.create(req.body.charge)
      console.log(req.body.charge)
      const storeNewInvoice = await Invoice.findOneAndUpdate(req.body.charge, { ...req.body, junoResponse: invoiceCreate })

      // console.log(`Criando Fatura: ${JSON.stringify(invoiceCreate._embedded)}`)
      // console.log(`Armazenando Fatura: ${(storeInvoice)}`)

      res.status(200).send({ storeInvoice, invoiceCreate })

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.stack || console.log(err.stack) });
    }
  },

  // //INVOICE INSERTION
  // invoiceInsert: async (req, res) => {
  //   const { charge } = req.body

  //   try {
  //     const createNewInvoice = await payment.charge(req.body, req.headers.resourcetoken);

  //     // const storeInvoice = await Invoice.create(req.body.charge)
  //     console.log(req.body.charge)
  //     const storeNewInvoice = await Invoice.findOneAndUpdate(req.body.charge, { ...req.body, junoResponse: invoiceCreate })

  //     // console.log(`Criando Fatura: ${JSON.stringify(invoiceCreate._embedded)}`)
  //     // console.log(`Armazenando Fatura: ${(storeInvoice)}`)

  //     res.status(200).send({ storeInvoice, invoiceCreate })

  //   } catch (err) {
  //     return res.status(err.status || 400).send({ message: err.stack || console.log(err.stack) });
  //   }
  // },

  //CREATE INVOICE
  createInvoice: async (req, res) => {
    // const header = req.headers.resourcetoken
    const formData = req.body;

    try {
      //1 pegar dados do formulario
      //2 chamar função create Charge
      const charge = await AccountController.createCharge(req.body, req.headers.resourcetoken)
      //3 pegar resposta da create Charge

      const storeInvoice = await findOneAndUpdate(req.body.charge, { ...req.body, junoResponse: charge })

      //4 salvar dados do form e resposta da juno no bd
      res.send(charge)
    } catch (err) {
      res.send(err)
    }
  },

  invoiceInsert: async (req, res) => {
    const { charge } = req.body

    try {
      const createNewInvoice = await payment.charge(req.body, req.headers.resourcetoken);

      // const storeInvoice = await Invoice.create(req.body.charge)
      console.log(req.body.charge)
      const storeNewInvoice = await Invoice.findOneAndUpdate(req.body.charge, { ...req.body, junoResponse: invoiceCreate })

      // console.log(`Criando Fatura: ${JSON.stringify(invoiceCreate._embedded)}`)
      // console.log(`Armazenando Fatura: ${(storeInvoice)}`)

      res.status(200).send({ storeInvoice, invoiceCreate })

    } catch (err) {
      return res.status(err.status || 400).send({ message: err.stack || console.log(err.stack) });
    }
  },


  //GET COMPANIES
  companies: async (req, res) => {

    try {
      const charge = await payment.chargeById(req.params.id, req.headers.resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //GET COMPANY BY ID
  companyById: async (req, res) => {
    try {
      const charge = await payment.charge(req.body, req.headers.resourcetoken);
      res.status(200).send(charge)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  },


  //COMPANY INSERTION
  companyInsert: async (req, res) => {
    try {
      const card_payment = await payment.cardPayment(req.body, req.headers.resourcetoken)
      return res.status(200).send(card_payment)

    } catch (err) {
      return res.status(err.status || 400).send({ message: err });
    }
  }

}