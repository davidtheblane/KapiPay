const mongoose = require("../database");

const accountResponseSchema = new mongoose.Schema({
  //Resposta de criação de conta da Juno
  id: String,
  type: String,
  status: String,
  personType: String,
  document: String,
  createdOn: String,
  resourceToken: String,
  accountNumber: Number,
  _links: Object

});

const AccountResponse = mongoose.model(
  "accountResponse",
  accountResponseSchema
);

module.exports = AccountResponse;
