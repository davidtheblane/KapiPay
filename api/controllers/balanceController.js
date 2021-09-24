const express = require('express');
const authMiddleware = require('../middlewares/auth');
const payment = require('../lib/payment/juno');

const router = express.Router();

// router.use(authMiddleware);


//GET BALANCE
router.get('/', async (req, res) => {
  try {
    const balance = await payment.balance();

    const obj = {
      total: balance.transferableBalance
    }

    return res.send(obj)

  } catch (err) {
    return res.status(400).send({ err: "error finding balance " });
  }

});





module.exports = app => app.use('/balance', router);
