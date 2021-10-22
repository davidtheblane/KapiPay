const { Router } = require('express');
const authMiddleware = require('../middlewares/auth')
const accountController = require('../controllers/accountController');
const invoiceController = require('../controllers/invoiceController')
const multer = require('multer')
const upload = multer()
const router = new Router()

router.use(authMiddleware)

router.get('/balance', accountController.getUserBalance)
router.get('/charges', accountController.listCharges)
router.get('/charges/:id', accountController.chargeByChargeId)


router.get('/status', accountController.accountStatus)
router.get('/documents', accountController.listPendingDocuments)


router.post('/create', accountController.createAccount)
router.post('/charge', accountController.createCharge)
router.post('/documents/:id', accountController.sendDocuments)
router.post('/payment_card', accountController.cardPayment)
router.post('/save_card', accountController.saveCard)

router.get('/invoices', invoiceController.invoices)
router.post('/invoice_insert', invoiceController.invoiceInsert)


// router.post('/payment_pix', authMiddleware, accountController.pixPayment)

module.exports = router