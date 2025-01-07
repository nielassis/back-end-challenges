"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item_pedido", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      pedidoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pedidos",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      pizzaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pizzas",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("item_pedido");
  },
};
