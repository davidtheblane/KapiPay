const payment = require('../resources/lib/payment/juno');
// const invoicePay = require('../resources/lib/payment/invoice')
const Company = require('../models/company');
const Invoice = require('../models/invoice')



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
      // const invoiceCreate = await payment.charge(req.body, req.headers.resourcetoken);

      const storeInvoice = await Invoice.create({ charge }, { ...req.body })
      // const storeInvoice = await Invoice.findOneAndUpdate({ charge }, { ...req.body, junoResponse: invoiceCreate })


      // console.log(`Criando Fatura: ${JSON.stringify(invoiceCreate._embedded)}`)
      // console.log(`Armazenando Fatura: ${(storeInvoice)}`)



      return res.status(200).send(storeInvoice)

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