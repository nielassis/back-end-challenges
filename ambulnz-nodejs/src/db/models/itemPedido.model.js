module.exports = (sequelize, DataTypes) => {
  const itemPedido = sequelize.define("itemPedido", {
    pedidoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pizzaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("now"),
    },
  });

  itemPedido.associate = (models) => {
    // Associação do ItemPedido com Pedido
    itemPedido.belongsTo(models.Pedido, {
      foreignKey: "pedidoId",
      as: "pedido",
    });

    // Associação do ItemPedido com Pizza
    itemPedido.belongsTo(models.Pizza, {
      foreignKey: "pizzaId",
      as: "pizza",
    });
  };

  return itemPedido;
};
