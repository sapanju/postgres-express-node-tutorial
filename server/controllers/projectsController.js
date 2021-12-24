const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const Project = require('../models').Project;
const User = require('../models').User;

module.exports = {
  async create(req, res) {
    try {
      const project = await Project.create({
        title: req.body.title,
      });
      res.status(201).send(project);
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async addUserToProject(req, res) {
    try {
      const project = await Project.findByPk(req.params.projectId);
      const { email, firstName, lastName } = req.body.user;
      const user = await User.create({
        email,
        firstName,
        lastName
      });
      await user.addProject(project);
      project.users = [user];
      res.status(201).send(project);
    } catch (error) {
      res.status(400).send(error)
    }
  }
};
