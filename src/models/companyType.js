const mongoose = require('../database');


const CompanyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cnpj: {
    type: String,
    require: true,
  },

  companyId: {
    type: mongoose.ObjectId,
    ref: `Company`
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanyType = mongoose.model("CompanyType", CompanyTypeSchema);

module.exports = CompanyType;