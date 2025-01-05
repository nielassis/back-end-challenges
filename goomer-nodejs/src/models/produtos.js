module.exports = (sequelize, DataTypes) => {
  const Produtos = sequelize.define(
    "Produtos",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      restauranteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "restaurantes",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      promocao: {
        type: DataTypes.JSONB, // Usando JSONB para armazenar os dados de promoção
        allowNull: true,
      },
    },
    {
      tableName: "produtos",
      timestamps: true,
    }
  );

  Produtos.associate = (models) => {
    Produtos.belongsTo(models.Restaurante, {
      foreignKey: "restauranteId",
      as: "restaurante",
    });
  };

  return Produtos;
};
