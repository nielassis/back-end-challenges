module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define("item_pedido", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pedidoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "pedidos",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    pizzaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pizzas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  ItemPedido.associate = (models) => {
    ItemPedido.belongsTo(models.Pedido, {
      foreignKey: "pedidoId",
      as: "pedidos",
    });
  };

  ItemPedido.associate = (models) => {
    ItemPedido.belongsTo(models.Pizzas, {
      foreignKey: "pizzaId",
      as: "pizzas",
    });
  };
  return ItemPedido;
};
