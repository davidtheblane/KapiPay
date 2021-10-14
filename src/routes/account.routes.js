const { Router } = require('express');
const authMiddleware = require('../middlewares/auth')
const accountController = require('../controllers/accountController');
const multer = require('multer')

const upload = multer()

const router = new Router()


router.get('/balance', authMiddleware, accountController.getUserBalance)
router.get('/charges', authMiddleware, accountController.listCharges)
router.get('/charges/:id', authMiddleware, accountController.chargeByChargeId)


router.get('/status', authMiddleware, accountController.accountStatus)
router.get('/documents', authMiddleware, accountController.listPendingDocuments)


router.post('/create', authMiddleware, accountController.createAccount)
router.post('/charge', authMiddleware, accountController.createCharge)
router.post('/documents/:id', authMiddleware, accountController.sendDocuments)
router.post('/payment_card', authMiddleware, accountController.cardPayment)
router.post('/save_card', authMiddleware, accountController.saveCard)

// router.post('/payment_pix', authMiddleware, accountController.pixPayment)

module.exports = router