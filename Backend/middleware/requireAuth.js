// middleware/requireAuth.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Request not authorized' });
  }
};

module.exports = requireAuth;
