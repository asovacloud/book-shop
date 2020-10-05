const path = require('path');

const express = require('express');

const adminData =require('./admin');

const router = express.Router();

router.use((req, res, next) => {
  const products = adminData.products;
  res.render('not-found', {prods: products, pageTitle: 'Not Found'});
});

module.exports = router;