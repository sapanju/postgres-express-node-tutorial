const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  async create(req, res) {
    try {
      const todo = await Todo.create({
        title: req.body.title,
        ProjectId: req.body.ProjectId,
        UserId: req.body.UserId
      });
      res.status(201).send(todo);
    } catch (error) {
      res.status(400).send(error)
    }
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: TodoItem }, 'createdAt', 'ASC'],
        ],
      })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem
        }],
      })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
