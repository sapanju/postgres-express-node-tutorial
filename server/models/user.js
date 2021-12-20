module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: 'UserProjects'
    });
    User.hasMany(models.Todo);
  };
  return User;
};
