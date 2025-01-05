module.exports = (sequelize, DataTypes) => {
  const Restaurante = sequelize.define(
    "Restaurante",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horarioSemana: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      horarioFimSemana: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "restaurantes",
      timestamps: true,
    }
  );

  // Relacionamento com Produtos
  Restaurante.associate = (models) => {
    Restaurante.hasMany(models.Produtos, {
      foreignKey: "restauranteId",
      as: "produtos",
    });
  };

  return Restaurante;
};
