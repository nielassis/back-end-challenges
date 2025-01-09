module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    "Pedido",
    {
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
      precoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "pedidos",
      hooks: {
        beforeSave: async (pedido) => {
          // Verifica se há itens no pedido
          const itemPedidos = await pedido.getItemPedidos();

          if (itemPedidos && itemPedidos.length > 0) {
            let total = 0;

            // Calcula o total baseado nos itens do pedido
            for (const itemPedido of itemPedidos) {
              const pizza = await itemPedido.getPizza();
              const quantidade = itemPedido.quantidade;
              total += pizza.preco * quantidade;
            }

            // Atualiza o campo precoTotal
            pedido.precoTotal = total;
          }
        },
      },
    }
  );

  Pedido.associate = (models) => {
    Pedido.hasMany(models.itemPedido, {
      foreignKey: "pedidoId",
      as: "itemPedidos",
    });
    Pedido.belongsToMany(models.Pizza, {
      through: models.itemPedido,
      foreignKey: "pedidoId",
      otherKey: "pizzaId",
    });
  };

  return Pedido;
};
