const mongoose = require('../database');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  //"type":"PAYMENT"
  type: {
    type: String,
    // required: true,
  },


  //"document": "stringstrin", = CPF/CNPJ
  document: {
    type: String,
    // required: true,
  },

  //"birthDate": "yyyy-MM-dd",
  birthDate: {
    type: String,
  },

  //"phone": "string",
  phone: {
    type: String,
    // required: true,
  },

  //"businessArea": number, Define a área de negócio da empresa.
  //listagem está no endpoint get /data/business-areas
  businessArea: {
    type: Number,
    // required: true,
  },

  //"linesOfBusiness": "string",
  //Define a linha de negócio da empresa. Campo de livre preenchimento.
  linesOfBusiness: {
    type: String,
    // required: true,
  },

  //"companyType": "string", => "MEI" "EI" "EIRELI" "LTDA" "SA"
  //Define a natureza de negócio. Obrigatório para contas PJ.
  //listagem está no endpoint get /data/company-types
  companyType: {
    type: String,
  },

  /*
  "legalRepresentative": {"name", "document", "birthDate":"yyyy-MM-dd", "motherName", "type":"INDIVIDUAL"}
  Representante Legal. Obrigatório para contas PJ.
  */

  legalRepresentative: {
    type: Object
  },


  /* 
  "address": {"name", "number", "complement","neighborhood","city","state","postCode"}
  */

  address: {
    type: Object,
    // required: true,
  },


  /*    
  "bankAccount": {"bankNumber", "agencyNumber", "accountNumber", "accountComplementNumber", "accountType",
  "accountHolder": {"name", "document"} }
  */

  bankAccount: {
    type: Object,
    // required: true,
  },


  //"emailOptOut": boolean 
  //Define se a conta criada receberá ou não quaisquer emails Juno como os enviados 
  //nas operações de emissão de cobranças, trasnferências, entre outros. 
  //Útil para comunicações com seu cliente diretamente pela sua aplicação.
  emailOptOut: {
    type: Object,
    default: false
  },

  //"autoTransfer": boolean,
  //Define se as transferências da conta serão feitas automaticamente. 
  //Caso haja saldo na conta digital em questão, a transferência será feita todos os dias.
  autoTransfer: {
    type: Boolean,
    default: false
  },

  //"socialName": false,
  //Define se o atributo name poderá ou não receber o nome social.
  //Válido apenas para PF.
  socialName: {
    type: Boolean,
    default: false
  },

  //"monthlyIncomeOrRevenue": 0,
  //Renda mensal ou receita. Obrigatório para PF e PJ.
  monthlyIncomeOrRevenue: {
    type: Number
  },

  //"cnae": "strings",
  //Campo destinado ao CNAE(Classificação Nacional de Atividades Econômicas) da empresa. 
  //Obrigatório para PJ.
  cnae: {
    type: String
  },

  //"establishmentDate": "string",
  //Data de abertura da empresa. Obrigatório para PJ.
  establishmentDate: {
    type: String
  },

  //"pep": true,
  //Define se o cadastro pertence a uma pessoa politicamente exposta.
  pep: {
    type: Boolean,
    defaul: true
  },

  //"companyMembers": [{"name", "document", "birthDate"}]
  //Quadro societário da empresa. Obrigatório para contas PJ de companyType SA e LTDA.
  companyMembers: {
    type: Array
  },

  junoResponse: {
    type: Object
  }
});


//"pre(save)" = antes de salvar o usuario
UserSchema.pre("save", async function (next) {

  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;