'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petName: {
        type: Sequelize.TEXT,
      },
      petType: {
        type: Sequelize.ENUM('cat', 'dog', 'bird'),
      },
      ownerName: {
        type: Sequelize.TEXT,
      },
      ownerAddress: {
        type: Sequelize.TEXT,
      },
      ownerPhoneNumber: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
};
