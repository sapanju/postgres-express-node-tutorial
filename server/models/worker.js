module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define('Worker', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Worker.associate = (models) => {
    Worker.hasMany(models.TodoItem, {
      foreignKey: 'todoItemId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Worker.belongsToMany(models.Project, {
      through: 'WorkerProjects',
      foreignKey: 'workerId'
    });
  };
  return Worker;
};
