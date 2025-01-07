"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pizzas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ingredientes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("pizzas");
  },
};
