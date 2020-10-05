const path = require('path');

const express = require('express');

const rootPath = require('../util/path');
const adminData =require('./admin');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  const products = adminData.products;
  res.render(
    'add-product',
    {
      prods: products,
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      activeAddProduct: true
    });
});

router.post('/add-product', (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
