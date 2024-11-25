'use strict';

const express = require('express');
const logger = require('morgan');

const ordersRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/orders', ordersRouter);

module.exports = app;
