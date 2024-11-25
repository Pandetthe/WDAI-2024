'use strict';

const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET || 'example_secret';

module.exports = {
  authenticateJWT(req, res, next) {
    const auth = req.header('Authorization');
    if (!auth) {
      return res.status(403).json({ message: 'Access denied! Authorization header has not been provided.' });
    }
    if (!auth.startsWith('Bearer')) {
      return res.status(403).json({ message: 'Access denied! Wrong authorization type.' });
    }
    const token = auth.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Access denied! No token provided.' });
    }
    jwt.verify(token, jwt_secret, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }
      req.userId = payload.userId;
      next();
    });
  }
}