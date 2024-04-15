const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); 
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error('User not found');
    }

   
    req.user = user;
    next();
  } catch (err) {
    logger.error('Authentication failed:', err); 
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
