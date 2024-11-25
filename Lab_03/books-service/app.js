'use strict';

const express = require('express');
const logger = require('morgan');

const booksRouter = require('./routes/books');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', booksRouter);

module.exports = app;
