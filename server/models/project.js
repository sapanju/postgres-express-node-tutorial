module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING
    }
  });
  Project.associate = (models) => {
    Project.belongsToMany(models.User, {
      through: 'UserProjects'
    });
    Project.hasMany(models.Todo);
  };
  return Project;
};
