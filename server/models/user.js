module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: 'UserProjects'
    });
  };
  return User;
};
