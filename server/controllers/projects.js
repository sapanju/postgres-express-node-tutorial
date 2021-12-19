const Project = require('../models').Project;

module.exports = {
  create(req, res) {
    return Project
      .create({
        name: req.body.name,
      })
      .then((proj) => res.status(201).send(proj))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Project
      .findAll()
    //   .findAll({
    //     include: [{
    //       model: TodoItem,
    //       as: 'todoItems',
    //     }],
    //     order: [
    //       ['createdAt', 'DESC'],
    //       [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
    //     ],
    //   })
      .then((projects) => res.status(200).send(projects))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Project
      .findById(req.params.projectId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then((proj) => {
        if (!proj) {
          return res.status(404).send({
            message: 'proj Not Found',
          });
        }
        return res.status(200).send(proj);
      })
      .catch((error) => res.status(400).send(error));
  },

//   update(req, res) {
//     return Todo
//       .findById(req.params.todoId, {
//         include: [{
//           model: TodoItem,
//           as: 'todoItems',
//         }],
//       })
//       .then(todo => {
//         if (!todo) {
//           return res.status(404).send({
//             message: 'Todo Not Found',
//           });
//         }
//         return todo
//           .update({
//             title: req.body.title || todo.title,
//           })
//           .then(() => res.status(200).send(todo))
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },

//   destroy(req, res) {
//     return Todo
//       .findById(req.params.todoId)
//       .then(todo => {
//         if (!todo) {
//           return res.status(400).send({
//             message: 'Todo Not Found',
//           });
//         }
//         return todo
//           .destroy()
//           .then(() => res.status(204).send())
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },
};
