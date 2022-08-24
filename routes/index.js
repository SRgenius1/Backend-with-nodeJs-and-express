const productsRoter = require('./products.js');
const UsersRouter = require('./users');
const categoriesRouter = require('./categories');
const express = require('express');


function routersApi (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/products', productsRoter);
  app.use('/user', UsersRouter);
  app.use('/categories', categoriesRouter);
};

module.exports = routersApi;
