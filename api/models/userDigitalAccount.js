const mongoose = require("../database");

const UserDigitalAccountSchema = new mongoose.Schema({
  //"type":"PAYMENT"
  type: {
    type: String,
    required: true,
  },

  //"name": "string",
  name: {
    type: String,
    require: true,
  },

  //"document": "stringstrin", = CPF/CNPJ
  document: {
    type: String,
    required: true,
  },

  //"email": "string",
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  //"birthDate": "yyyy-MM-dd",
  birthDate: {
    type: String,
  },

  //"phone": "string",
  phone: {
    type: String,
    required: true,
  },

  //"businessArea": number, Define a área de negócio da empresa.
  //listagem está no endpoint get /data/business-areas
  businessArea: {
    type: Number,
    required: true,
  },

  //"linesOfBusiness": "string",
  //Define a linha de negócio da empresa. Campo de livre preenchimento.
  linesOfBusiness: {
    type: String,
    required: true,
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
  // // legalRepresentative: {
  // //   type: Object,
  // //   additionalProperties: {
  // //     name: String,
  // //     document: String,
  // //     birthDate: String,
  // //     motherName: String,
  // //     type: String
  // //   }
  // // },
  legalRepresentative: {
    type: Object
  },



  /* 
  "address": {"name", "number", "complement","neighborhood","city","state","postCode"}
  */
  // // address: {
  // //   type: Object,
  // //     additionalProperties: {
  // //       name: String,
  // //       number: String,
  // //       complement: String,
  // //       neighborhood: String,
  // //       city: String,
  // //       state: String,
  // //       postCode: String
  // //     },
  // //   required: true,
  // // },
  address: {
    type: Object,
    required: true,
  },


  /*    
  "bankAccount": {"bankNumber", "agencyNumber", "accountNumber", "accountComplementNumber", "accountType",
  "accountHolder": {"name", "document"} }
  */
  // // bankAccount: {
  // //   type: Object,
  // //     additionalProperties: {
  // //       bankNumber: String,
  // //       agencyNumber: String,
  // //       accountNumber: String,
  // //       accountComplementNumber: String,
  // //       accountType: String,
  // //       accountHolder: Object,
  // //         additionalProperties: {
  // //           name: String,
  // //           document: String
  // //         },
  // //   },
  // //   required: true,
  // // },
  bankAccount: {
    type: Object,
    required: true,
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

});




//"pre(save)" = antes de salvar o usuario
// UserDigitalAccountSchema.pre("save", async function (next) {

//   next();
// });


const UserDigitalAccount = mongoose.model(
  "UserDigitalAccount",
  UserDigitalAccountSchema
);

module.exports = UserDigitalAccount;
