const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const Project = require('../models').Project;
const User = require('../models').User;
const bcrypt = require('bcrypt');
const moment = require('moment');
const generateAccessToken = require('../utils/authUtils').generateAccessToken;

module.exports = {
  async register(req, res) {
    try {
      const { email, firstName, lastName, password } = req.body.user;
      // hash pw
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        firstName,
        lastName,
        passwordHash,
        lastIp: req.ip,
        lastLoggedIn: moment().format()
      });

      // issue jwt
      const token = generateAccessToken(user.id, email);

      res.cookie('jwt', token, {secure: true, httpOnly: true})
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getUser(req, res) {
    try {
      const include = [];
      const todosWhere = {};
      if (req.query && req.query.include && req.query.include.match(/project/)) {
        include.push({
          model: Project,
          include: [{
            model: Todo,
            include: [{
              model: TodoItem
            }]
          }]
        });
        todosWhere.ProjectId = null;  
      }
      if (req.query && req.query.include && req.query.include.match(/todo/)) {
        include.push({
          model: Todo,
          include: [{
            model: TodoItem
          }],
          where: todosWhere
        });
      }
      const user = await User.findByPk(req.user.id, {
        include
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async updateUser(req, res) {
    // update a user's first or last name
    try {
      const updateParams = {};
      if (req.body.user && req.body.user.firstName) {
        updateParams.firstName = req.body.user.firstName;
      }
      if (req.body.user && req.body.user.lastName) {
        updateParams.lastName = req.body.user.lastName;
      }

      await User.update({
        ...updateParams
      }, {
        where: {
          id: req.user.id
        }
      });
      res.status(200).send({
        user: {
          ...req.user.toJSON(),
          ...updateParams
        }
      });
    } catch (error) {
      res.status(400).send(`Could not update user, ${error}`);
    }
  }
};
