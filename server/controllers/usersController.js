const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const Project = require('../models').Project;
const User = require('../models').User;

module.exports = {
  async create(req, res) {
    try {
      const { email, firstName, lastName } = req.body.user;
      const user = await User.create({
        email,
        firstName,
        lastName
      });
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getUser(req, res) {
    try {
      const include = [];
      if (req.query && req.query.include && req.query.include.match(/project/)) {
        include.push({
          model: Project
        });
      }
      const user = await User.findByPk(req.params.userId, {
        include
      });
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  }
};
