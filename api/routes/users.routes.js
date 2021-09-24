const { Router } = require('express');
const userController = require('../controllers/userController');

const router = new Router();


router.get('/', userController.listUsers)
router.get('/:id', userController.getUser)


router.post('/register', userController.createUser)
router.post('/login', userController.authUser)

router.post('/forgot_password', userController.forgotPassword)
router.post('/reset_password', userController.passwordReset)



module.exports = router;