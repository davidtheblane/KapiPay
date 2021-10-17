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

  //O nome do tipo da compania (ex: agua,luz...)
  companyType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'CompanyType'
  }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;