const { Router } = require('express');
const authMiddleware = require('../middlewares/auth')
const accountController = require('../controllers/accountController');

const router = new Router()


router.get('/balance', authMiddleware, accountController.getUserBalance)
// router.post('/charge', authMiddleware, accountController.getUserBalance)



module.exports = router