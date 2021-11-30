const mongoose = require('../database');

const UserAccountSchema = new mongoose.Schema({
  //ID do usuário
  userId: {
    type: mongoose.ObjectId,
    ref: `User`
  },

  type: {
    type: String,
    // require: true
  },

  /*"businessArea": number, Define a área de negócio da empresa.
    listagem está no endpoint get /data/business-areas
  */
  businessArea: {
    type: Number,
    // required: true,
  },

  /*"linesOfBusiness": "string",
    Define a linha de negócio da empresa. Campo de livre preenchimento.
  */
  linesOfBusiness: {
    type: String,
    // required: true,
  },

  billing: {
    type: Object,
    // required: true,
  },

  /*"bankAccount": {"bankNumber", "agencyNumber", "accountNumber", "accountComplementNumber", "accountType",
    "accountHolder": {"name", "document"} }
  */
  bankAccount: {
    type: Object,
    // required: true,
  },

  /* Resposta da criação de conta da JUNO */
  junoAccountCreateResponse: {
    type: Object
  },

  accountStatus: {
    type: Object
  },

  accountBalance: {
    type: Object
  },

  // Usa Hash pra tokenizar um cartão
  cardToken: {
    type: Object
  },

  docId: {
    type: String
  },

  selfieId: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const UserAccount = mongoose.model("UserAccount", UserAccountSchema);

module.exports = UserAccount;