module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');
    if (!table.passwordHash) {
      await queryInterface.addColumn('Users', 'passwordHash', {
        type: Sequelize.STRING
      });
    }
    if (!table.lastIp) {
      await queryInterface.addColumn('Users', 'lastIp', {
        type: Sequelize.STRING
      });
    }
    if (!table.lastLoggedIn) {
      await queryInterface.addColumn('Users', 'lastLoggedIn', {
        type: Sequelize.DATE
      });
    }
    if (!table.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.ENUM,
        values: ['admin', 'manager', 'contributer'],
        defaultValue: 'contributer'
      });
    }
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');
    if (table.passwordHash) {
      await queryInterface.removeColumn('Users', 'passwordHash');
    }
    if (table.lastIp) {
      await queryInterface.removeColumn('Users', 'lastIp');
    }
    if (table.lastLoggedIn) {
      await queryInterface.removeColumn('Users', 'lastLoggedIn');
    }
    if (table.role) {
      await queryInterface.sequelize.query("DROP TYPE \"enum_Users_role\"; ALTER TABLE \"users\" DROP COLUMN \"role\";");
    }
    try {
      await queryInterface.sequelize.query("DROP TYPE \"enum_Users_role\";");
    } catch (err) {
      console.log(err);
    }
    return Promise.resolve();
  }
};