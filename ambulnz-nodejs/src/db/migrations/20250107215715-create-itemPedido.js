module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("itemPedido", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pedidoId: {
        type: Sequelize.UUID,
        references: {
          model: "pedidos",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      pizzaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "pizzas",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("itemPedido");
  },
};
