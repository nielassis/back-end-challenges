const db = require("../db/models");

const find = async (req, res) => {
  try {
    const pizzas = await db.Pizzas.findAll();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const findById = async (req, res) => {
  try {
    const pizzas = await db.Pizzas.findOne({
      where: { id: req.params.id },
    });
    if (!pizzas) {
      res.status(404).json({ error: "Pizza não encontrada ou não existente" });
    }
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = { find, findById };
