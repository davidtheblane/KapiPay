const sentryError = require('../resources/error-handler');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const UserInvoice = require('../models/userInvoice');
const Company = require('../models/company');
const CompanyType = require('../models/companyType');


module.exports = {

  // GET COMPANIES
  getCompanies: async (req, res) => {
    try {
      const companies = await await Company.find({})
      res.status(200).send(companies)
    } catch (err) {
      sentryError(err);
      return res.status(400).send(err);
    }
  },

  //  //SEND CHARGE
  //  createCharge: async (req, res) => {
  //   try {
  //     const { email } = req.body.billing;
  //     const userModel = await User.findOne({ email })

  //     if (userModel) {
  //       const response = await payment.charge(req.body, req.headers.resourcetoken);

  //       if (UserInvoice.find({ userAccountId: userModel._id })) {
  //         const invoice = await UserInvoice.create({ invoiceInfo: response, userAccountId: userModel._id })

  //         res.status(200).send(invoice)
  //       }
  //     } else {
  //       return res.status(400).send({ message: "Usuário não tem registro." });
  //     }

  //   } catch (err) {
  //     sentryError(err);
  //     return res.status(400).send({ message: err.message });
  //   }
  // },




  //INSERT COMPANY
  newCompany: async (req, res) => {
    try {
      const { company } = req.body

      if (company.cnpj.length != 14) { return res.status(403).send({ message: "CNPJ Inválido" }) }

      const companyModel = await Company.findOne({ cnpj: company.cnpj })
      // console.log(`companyModel${companyModel}`)
      if (companyModel) {
        return res.status(403).send({ message: "Já existe uma empresa com esse cnpj" })
      }
      else {
        const response = await Company.create(company);
        return res.status(200).send(response)
      }

    } catch (err) {
      sentryError(err);
      return res.status(400).send(err.message);
    }
  },


}
