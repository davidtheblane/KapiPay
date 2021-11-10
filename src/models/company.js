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

  companyType: {
    type: String,
    require: true,
  },

  description: {
    type: String,
  },

  companyTypeId: {
    type: mongoose.ObjectId,
    ref: `CompanyType`
  },

  invoiceId: {
    type: mongoose.ObjectId,
    ref: `Invoice`
  }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;