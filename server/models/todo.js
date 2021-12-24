module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Todo.associate = (models) => {
    Todo.hasMany(models.TodoItem);
    Todo.belongsTo(models.Project);
    Todo.belongsTo(models.User);
  };
  return Todo;
};
