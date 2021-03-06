const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const cepController = require('../controllers/cep.controller');
const accountController = require('../controllers/accountController');
const companyController = require('../controllers/companyController')
const authMiddleware = require('../middlewares/auth');

//Open Routes
router.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});
router.get('/cep/:id', cepController.getCep)

//Auth Routes
router.post('/register', authController.createUser)
router.post('/login', authController.authUser)
router.post('/forgot_password', authController.forgotPassword)
router.post('/reset_password', authController.passwordReset)


// Above HERE, all routes are authenticated
router.use(authMiddleware)
//Users
// router.get('/users', userController.listUsers) //admin
// router.get('/users/:id', userController.getUser) //admin
router.get('/user/data', userController.userData)


//Account Routes - GET
router.get('/account/balance', accountController.getUserBalance)
router.get('/account/invoices', accountController.listInvoices)
router.get('/account/invoices/:id', accountController.invoiceById)
router.get('/account/status', accountController.accountStatus)
router.get('/account/documents', accountController.listPendingDocuments)
router.get('/account/company-type', companyController.getCompanyType)
router.get('/account/company', companyController.getCompany)

//Account Routes - POST
router.post('/account/create', accountController.createAccount)
router.post('/account/invoice', accountController.createInvoice)
router.post('/account/documents/:id', accountController.sendDocuments)
router.post('/account/payment_card', accountController.cardPayment)
router.post('/account/save_card', accountController.saveCard)
router.post('/account/bank_account', accountController.bankAccount)
router.post('/account/bill_payment', accountController.billPayment)
router.post('/account/company', companyController.newCompany)
router.post('/account/sms', accountController.sendSMS)

// router.post('/account/company/type', companyController.newCompanyType)


// router.get('/account/invoices', invoiceController.invoices)
// router.post('/account/invoice_insert', invoiceController.createInvoice)
// router.post('/account/payment_pix', authMiddleware, accountController.pixPayment)

module.exports = router;



