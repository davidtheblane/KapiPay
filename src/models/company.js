const mongoose = require('../database');


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cnpj: {
    type: String,
    require: true,
  },

  companyService: {
    type: String,
    require: true,
  },

  description: {
    type: String,
  },

  invoiceId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Invoice._id'
  }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;