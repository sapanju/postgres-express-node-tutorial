const User = require('../models').User;
const bcrypt = require('bcrypt');
const generateAccessToken = require('../utils/authUtils').generateAccessToken;


module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body.user;
      // hash pw
      const user = await User.findOne({
        where: { email }
      });

      if (!bcrypt.compareSync(password, user.passwordHash)) {
        res.status(401).send('Incorrect password');
        return;
      }

      // issue jwt
      const token = generateAccessToken(user.id, email);

      res.cookie('jwt', token, { secure: true, httpOnly: true })
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async logout(req, res) {
    try {
      if (req.user) {
        delete req.user;
      }
      if (req.admin) {
        delete req.admin;
      }
      // TODO: blacklist jwt in redis database
      return res.redirect('/');
    } catch(error) {
    res.status(400).send(error)
  }
}
};
