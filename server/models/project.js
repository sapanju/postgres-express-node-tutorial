module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Project.associate = (models) => {
    Project.belongsToMany(models.Worker, {
      through: 'WorkerProjects',
      foreignKey: 'projectId'
    });
  };
  return Project;
};
