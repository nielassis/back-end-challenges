module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define("pedidos", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    dataPedido: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pendente", "em preparo", "entregue", "cancelado"),
      allowNull: false,
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Pedido.associate = (models) => {
    Pedido.hasMany(models.ItemPedido, {
      foreignKey: "pedidoId",
      as: "item_pedido",
    });
  };

  return Pedido;
};
