// const express = require('express');
// const router = express.Router();

// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require("../../swagger_output.json");
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');
// const cepController = require('../controllers/cep.controller');
// const accountController = require('../controllers/accountController');
// const companyController = require('../controllers/companyController')
// const authMiddleware = require('../middlewares/auth');

// router.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });
// router.get('/cep/:id', cepController.getCep)
// router.post('/register', authController.createUser)
// router.post('/login', authController.authUser)
// router.post('/forgot_password', authController.forgotPassword)
// router.post('/reset_password', authController.passwordReset)

// // Above all routes are authenticated
// router.use(authMiddleware)
// //Users
// router.get('/users', userController.listUsers)
// router.get('/users/:id', userController.getUser)

// //Account Routes
// // GET
// router.get('/balance', accountController.getUserBalance)
// router.get('/charges', accountController.listCharges)
// router.get('/charges/:id', accountController.chargeByChargeId)
// router.get('/status', accountController.accountStatus)
// router.get('/documents', accountController.listPendingDocuments)
// router.get('/company', companyController.getCompany)
// // POST
// router.post('/create', accountController.createAccount)
// router.post('/charge', accountController.createCharge)
// router.post('/documents/:id', accountController.sendDocuments)
// router.post('/payment_card', accountController.cardPayment)
// router.post('/save_card', accountController.saveCard)
// router.post('/bank_account', accountController.bankAccount)
// router.post('/bill_payment', accountController.billPayment)
// router.post('/company', companyController.newCompany)

// // router.get('/invoices', invoiceController.invoices)
// // router.post('/invoice_insert', invoiceController.createInvoice)
// // router.post('/payment_pix', authMiddleware, accountController.pixPayment)

// module.exports = router;



