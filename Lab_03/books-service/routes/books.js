'use strict';

var express = require('express');
const { Book } = require('../models');
const { authenticateJWT } = require('../middlewares/JWT');

const router = express.Router();

router.get('/', authenticateJWT, async function(_req, res, _next) {
  try {
    const books = await Book.findAll();
    res.json(books); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', authenticateJWT, async function(req, res, _next) {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
    }
    res.json(book); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', authenticateJWT, async function(req, res, _next) {
  try {
    const { title, author, year } = req.body;
    const book = await Book.create({
      title,
      author,
      year,
    });
    return res.status(201).json({ id: book.id });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/:id', authenticateJWT, async function(req, res, _next) {
  try {
    const bookId = req.params.id;
    const deleted = await Book.destroy({
      where: {
        id: bookId,
      },
    });
    if (deleted == 1) {
      return res.status(201).json({ message: `Book with ID ${bookId} has been deleted.` });
    }
    return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;