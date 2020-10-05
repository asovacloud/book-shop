const path = require('path');

const expres = require('express');

const rootDir = require('../util/path');
const adminData =require('./admin');

const router = expres.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    cardListCSS: true
  });
});

module.exports = router;
