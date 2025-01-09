module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define(
    "Pizza",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredientes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
      tableName: "pizzas",
    }
  );

  Pizza.associate = (models) => {
    Pizza.belongsToMany(models.Pedido, {
      through: models.itemPedido,
      foreignKey: "pizzaId",
      otherKey: "pedidoId",
    });
  };

  return Pizza;
};
