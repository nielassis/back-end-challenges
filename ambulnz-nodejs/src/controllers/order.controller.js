const db = require("../db/models");

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

const createNewOrder = async (req, res) => {
  const { dataPedido, status, preco, itens } = req.body;

  if (!dataPedido || !status || !preco || !Array.isArray(itens)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const transaction = await db.sequelize.transaction();
    try {
      const pedido = await db.Pedido.create(
        {
          dataPedido,
          status,
          preco,
        },
        { transaction }
      );

      const itemPedidos = itens.map((item) => ({
        pedidoId: pedido.id,
        pizzaId: item.pizzaId,
        preco: item.preco,
        quantidade: item.quantidade,
      }));

      await db.ItemPedido.bulkCreate(itemPedidos, { transaction });
      await transaction.commit();
      res.status(201).json({
        message: "Pedido criado com sucesso",
        pedido,
        items: itemPedidos,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
      console.error(error);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = { find, findById, createNewOrder };
