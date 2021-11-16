const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const UserInvoice = require('../models/userInvoice');
const Company = require('../models/company');
const CompanyType = require('../models/companyType');


module.exports = {

  // GET COMPANIES
  getCompany: async (req, res) => {
    try {
      const companies = await Company.find({})
      res.status(200).send(companies)
    } catch (err) {
      sentryError(err);
      return res.status(400).send(err);
    }
  },

  getCompanyType: async (req, res) => {
    try {
      const company_type = await CompanyType.find({})
      res.status(200).send(company_type)
    } catch (err) {
      sentryError(err);
      return res.status(400).send(err);
    }
  },

  // // GET COMPANY By ID
  // getCompanyById: async (req, res) => {
  //   try {
  //     const companies = await await Company.find({})
  //     res.status(200).send(companies)
  //   } catch (err) {
  //     sentryError(err);
  //     return res.status(400).send(err);
  //   }
  // },


  //INSERT COMPANY
  newCompany: async (req, res) => {
    try {
      const { company } = req.body
      console.log(company)

      if (company.cnpj.length != 14) { return res.status(403).send({ message: "CNPJ Inválido" }) }

      const response = await Company.create(company);

      // const companyType = await CompanyType.create({ name: response.companyType, companyId: response._id })
      return res.status(200).send(response)

    } catch (err) {
      sentryError(err);
      return res.status(400).send(err.message);
    }
  },

  // newCompanyType: async (req, res) => {
  //   try {
  //     const { companyType } = req.body

  //     const companyTypeModel = await CompanyType.findOne({ name: companyType.name })
  //     console.log("companyModel", companyTypeModel)
  //     if (companyTypeModel) {
  //       return res.status(403).send({ message: "Esse serviço já foi cadastrado" })
  //     }
  //     else {
  //       const response = await CompanyType.create(companyType);
  //       return res.status(200).send(response)
  //     }

  //   } catch (err) {
  //     sentryError(err);
  //     return res.status(400).send(err.message);
  //   }
  // },
}
