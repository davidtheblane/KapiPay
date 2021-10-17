const mongoose = require('../database');


const InvoiceSchema = new mongoose.Schema({
  value: {
    type: Number,
    require: true,
  },
  paymentCode: {
    type: String,
    require: true,
  },

  //O nome da Cia
  companyName: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'CompanyType'
  },

  //O nome do tipo da compania (ex: agua,luz...)
  companyType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'CompanyType'
  }
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;