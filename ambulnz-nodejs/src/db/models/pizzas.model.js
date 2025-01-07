module.exports = (sequelize, DataTypes) => {
  const Pizzas = sequelize.define("pizzas", {
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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });

  Pizzas.associate = (models) => {
    Pizzas.hasMany(models.ItemPedido, {
      foreignKey: "pizzaId",
      as: "item_pedido",
    });
  };

  return Pizzas;
};
