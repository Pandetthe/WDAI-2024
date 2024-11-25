'use strict';

var express = require('express');
const { Order } = require('../models');
const { authenticateJWT } = require('../middlewares/JWT');

const router = express.Router();

router.get('/:id', authenticateJWT, async function(req, res, _next) {
  try {
    const userId = req.params.id;
    const orders = await Order.findAll({ where: { userId: userId } });
    if (!orders) {
      return res.status(404).json({ message: `Orders with UserID ${userId} not found.` });
    }
    res.json(orders); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', authenticateJWT, async function(req, res, _next) {
  const { bookId, amount } = req.body;
  try {
    const userId = req.userId;
    const order = await Order.create({
      bookId,
      userId,
      amount
    });
    return res.status(201).json({ id: order.id });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/:id', authenticateJWT, async function(req, res, _next) {
  try {
    const orderId = req.params.id;
    const deletedId = await Order.destroy({
      where: {
        id: orderId,
      },
    });
    if (deletedId == orderId) {
      return res.status(201).json({ message: `Order with ID ${orderId} has been deleted.` });
    }
    return res.status(404).json({ message: `Order with ID ${orderId} not found.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.patch('/:id', authenticateJWT, async function (req, res, _next) {
  const orderId = req.params.id;
  try {
    const { bookId, amount } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${orderId} not found or you do not have permission to update it.` });
    }
    if (bookId !== undefined) order.book_id = bookId;
    if (amount !== undefined) order.amount = amount;
    await order.save();
    return res.status(200).json({ message: `Order with ID ${orderId} updated successfully.` });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    }
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;