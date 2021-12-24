const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
  async authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
      return res.status(401).send('User access token not provided');
    }
  
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.userId);
      req.user = user;
      next();
    }
    catch (err) {
      console.log(err); // TODO change to use proper logger
      return res.status(403).send(`Could not authenticate user, ${err.message}`);
    }
  },
  async authenticateAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).send('User not authenticated');
    }
    if (req.user.role !== 'admin') {
      return res.status(403).send('User must be an admin to perform this action.');
    }
    req.admin = user;
    next();
  }
  
};