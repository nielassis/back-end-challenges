const { Pedido, Pizza, itemPedido, db } = require("../db/models");

const find = async (req, res) => {
  try {
    const pedido = await db.Pedido.findAll();
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const findById = async (req, res) => {
  try {
    const pedido = await db.Pedido.findOne({
      where: { id: req.params.id },
    });
    if (!pedido) {
      res.status(404).json({ error: "Pedido não encontrada ou não existente" });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

async function createNewOrder(req, res) {
  const { pizzas, status } = req.body;
  console.log("pizzas:", pizzas);

  if (!pizzas || pizzas.length === 0) {
    return res
      .status(400)
      .json({ error: "Pizzas não fornecidas ou estão vazias" });
  }

  const now = new Date();

  try {
    // Criação do pedido
    const pedido = await Pedido.create({
      dataPedido: now,
      status: status,
      precoTotal: 0,
      createdAt: now,
      updatedAt: now,
    });

    const pizzasAssociadas = pizzas.map((pizza) => ({
      pedidoId: pedido.id,
      pizzaId: pizza.id,
      quantidade: pizza.quantidade,
      createdAt: now,
      updatedAt: now,
    }));

    await itemPedido.bulkCreate(pizzasAssociadas);

    let total = 0;
    for (const pizza of pizzas) {
      const pizzaDetails = await Pizza.findByPk(pizza.id);
      total += pizzaDetails.preco * pizza.quantidade;
    }
    pedido.precoTotal = total;
    await pedido.save();

    res.status(201).json(pedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
}

module.exports = { find, findById, createNewOrder };
