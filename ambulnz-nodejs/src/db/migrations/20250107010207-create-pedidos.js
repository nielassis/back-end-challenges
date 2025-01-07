"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pedidos", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      dataPedido: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pendente", "em preparo", "entregue", "cancelado"),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("pedidos");
  },
};
