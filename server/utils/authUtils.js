const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

exports.generateAccessToken = (userId, email) => {
  return jwt.sign({
    userId,
    email
  }, process.env.TOKEN_SECRET, { expiresIn: '900s' });
}