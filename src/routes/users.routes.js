const { Router } = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = new Router();

router.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});
router.get('/users', userController.listUsers)
router.get('/users/:id', userController.getUser)

router.post('/register', authController.createUser)
router.post('/login', authController.authUser)

router.post('/forgot_password', authController.forgotPassword)
router.post('/reset_password', authController.passwordReset)


module.exports = router;



