module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
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
