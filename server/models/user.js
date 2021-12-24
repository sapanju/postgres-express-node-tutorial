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
    },
    passwordHash: {
      type: DataTypes.STRING
    },
    lastIp: {
      type: DataTypes.STRING
    },
    lastLoggedIn: {
      type: DataTypes.DATE
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'manager', 'contributer'],
      defaultValue: 'contributer'
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
