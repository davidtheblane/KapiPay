const express = require('express');
const authMiddleware = require('../middlewares/auth');
const payment = require('../lib/payment/juno');

const router = express.Router();

// router.use(authMiddleware);



// GET CHARGES
router.get('/', async (req, res) => {

  try {
    const charges = await payment.listCharges();

    // const obj = {
    // amount: charges[1]
    // dueDate: charges.dueDate,
    // status: charges.status
    // }
    return res.send(charges)

  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
})



module.exports = app => app.use('/charges', router);