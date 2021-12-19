const Worker = require('../models').Worker;

module.exports = {
  async create(req, res) {
      try {
        const worker = await Worker.create({
            email: req.body.email
          });
          if (req.body.projectIds) {
              console.log('projectids', req.body.projectIds);
            await worker.setProjects([req.body.projectIds]);
          }
          res.status(201).send(worker);
      } catch (error) {
          res.status(400).send(error)
      };
  },

  list(req, res) {
    return Worker
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
      .then((workers) => res.status(200).send(workers))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Worker
      .findById(req.params.workerId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then((worker) => {
        if (!worker) {
          return res.status(404).send({
            message: 'worker Not Found',
          });
        }
        return res.status(200).send(worker);
      })
      .catch((error) => res.status(400).send(error));
  }
};
