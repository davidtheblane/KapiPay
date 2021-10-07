const { Router } = require('express');

const router = new Router();

router.get('/balance', (req, res) => {
  res.render("index");
})