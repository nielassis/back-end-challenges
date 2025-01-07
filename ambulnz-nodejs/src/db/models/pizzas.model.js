module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define(
    "Pizza",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredientes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "pizzas",
      timestamps: true,
    }
  );

  Pizza.associate = (models) => {
    Pizza.hasMany(models.ItemPedido, {
      foreignKey: "pizzaId",
      as: "itemPedido",
    });
  };

  return Pizza;
};
