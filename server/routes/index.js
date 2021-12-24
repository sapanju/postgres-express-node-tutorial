const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const projectsController = require('../controllers').projectsController;
const usersController = require('../controllers').usersController;
const User = require('../models').User;

const jwt = require('jsonwebtoken');


async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);  
    const user = await User.findByPk(decoded.userId);
    req.user = user;
    next();
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
}

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));

  app.post('/api/projects', projectsController.create);
  app.post('/api/projects/:projectId/users', projectsController.addUserToProject);

  app.get('/api/users', authenticateToken, usersController.getUser); // dashboard endpoint
  app.post('/api/users', usersController.register);
  app.post('/login', usersController.login);
  // app.post('/logout', usersController.logout);

};
