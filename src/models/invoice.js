const mongoose = require('../database');

const InvoiceSchema = new mongoose.Schema({
  amount: {
    type: Number,
    require: true,
  },
  dueDate: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  //Cartão ou Boleto
  paymentMethod: {
    type: String,
    require: true,
  },
  paymentCode: {
    type: String,
    require: true,
  },
  //Retorno da Juno
  paymentStatus: {
    type: String,
    require: true,
  },

  junoResponse: {
    type: Object,
  }

});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;