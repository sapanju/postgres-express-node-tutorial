const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const projectsController = require('../controllers').projectsController;
const usersController = require('../controllers').usersController;
const authController = require('../controllers').authController;
const authenticateToken = require('./middleware').authenticateToken;
const authenticateAdmin = require('./middleware').authenticateAdmin;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', authenticateToken, todosController.create);
  app.get('/api/todos', authenticateToken, todosController.list);
  app.get('/api/todos/:todoId', authenticateToken, todosController.retrieve);
  app.put('/api/todos/:todoId', authenticateToken, todosController.update);
  app.delete('/api/todos/:todoId', authenticateToken, todosController.destroy);

  app.post('/api/todos/:todoId/items', authenticateToken, todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', authenticateToken, todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', authenticateToken, todoItemsController.destroy
  );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));

  app.post('/api/projects', authenticateToken, projectsController.create);
  app.post('/api/projects/:projectId/users', authenticateToken, projectsController.addUserToProject);

  app.get('/api/users', authenticateToken, usersController.getUser); // dashboard endpoint
  app.post('/api/users', usersController.register);
  app.put('/api/users', authenticateToken, usersController.updateUser);
  app.post('/login', authController.login);
  app.get('/logout', authController.logout);
};
