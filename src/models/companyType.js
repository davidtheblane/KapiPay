const mongoose = require('../database');


const CompanyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const CompanyType = mongoose.model("CompanyType", CompanyTypeSchema);

module.exports = CompanyType;