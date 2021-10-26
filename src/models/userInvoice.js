const mongoose = require('../database');

const UserInvoiceSchema = new mongoose.Schema({
  //ID do usuário
  userAccountId: {
    type: mongoose.ObjectId,
    ref: `UserAccount`
  },

  description: {
    type: String,
    require: true,
  },

  invoiceInfo: {
    type: Object,
  },

  paymentInfo: {
    type: Object,
  }

});

const UserInvoice = mongoose.model("UserInvoice", UserInvoiceSchema);

module.exports = UserInvoice;