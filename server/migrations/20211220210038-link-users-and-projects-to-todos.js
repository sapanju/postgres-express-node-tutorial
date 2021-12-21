module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Todos');
    if (!table.ProjectId) {
      await queryInterface.addColumn('Todos', 'ProjectId', {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Projects',
          key: 'id'
        },
      });
    }
    if (!table.UserId) {
      await queryInterface.addColumn('Todos', 'UserId', {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        },
      });
    }
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Todos');
    if (table.ProjectId) {
      await queryInterface.removeColumn('Todos', 'ProjectId');
    }
    if (table.UserId) {
      await queryInterface.removeColumn('Todos', 'UserId');
    }
    return Promise.resolve();
  }
};