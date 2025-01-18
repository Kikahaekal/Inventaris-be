'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barangId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Barangs",
          key: 'id'
        }
      },
      buyer_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      goods_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      transaction_detail: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Transaksis');
  }
};