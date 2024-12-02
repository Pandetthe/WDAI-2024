'use strict';

const express = require('express');
const { User } = require('../models');
const { createJWT } = require('../middlewares/JWT');

const router = express.Router();

router.post('/register', async function(req, res, _next) {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
    });
    return res.status(201).json({ id: user.id });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    } else if (error.name === 'SequlizeUqniueConstraint') {
      return res.status(400).json({ message: 'Email address already in use.' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/login', async function(req, res, _next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && await user.comparePassword(password)) {
      const token = createJWT(user.id);
      return res.status(200).json({ token: token });
    } else {
      return res.status(404).json({ message: 'User has not been found!' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
