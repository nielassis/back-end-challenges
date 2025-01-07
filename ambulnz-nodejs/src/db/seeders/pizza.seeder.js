const { Pizza } = require("../models/");

module.exports = {
  up: async () => {
    const pizzas = [
      {
        nome: "Margherita",
        preco: 5,
        ingredientes: ["tomato", "mozzarella"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Bufala",
        preco: 6,
        ingredientes: ["tomato", "mozzarella di bufala"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Romana",
        preco: 5,
        ingredientes: ["tomato", "mozzarella", "anchovies", "oregano", "oil"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Diavola",
        preco: 7.5,
        ingredientes: ["tomato", "mozzarella", "spicy salami"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Pizza Bianca",
        preco: 5,
        ingredientes: ["mozzarella", "oregano"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Pizza.bulkCreate(pizzas);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Pizzas", null, {});
  },
};
