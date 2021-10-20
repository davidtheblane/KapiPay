const mongoose = require('../database');


const CompanyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  CompanyId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: `Company._id`
  }
});

const CompanyType = mongoose.model("CompanyType", CompanyTypeSchema);

module.exports = CompanyType;