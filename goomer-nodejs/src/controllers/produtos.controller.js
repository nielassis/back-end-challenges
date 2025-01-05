const db = require("../models");

/* const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});

client.connect(); */

const findAll = async (req, res) => {
  try {
    const produtos = await db.Produtos.findAll();

    // const result = await client.query("SELECT * FROM produtos");
    // console.log(`Produtos encontrados: ${result.rows}`);
    // res.status(200).json(result.rows);

    res.status(200).json(produtos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erro ao buscar produtos" });
  }
};

const createNew = async (req, res) => {
  const { restauranteId, ...produto } = req.body;

  if (!restauranteId) {
    return res.status(400).json({
      message: "restauranteId é obrigatório",
    });
  }

  try {
    /* 
    const query = `INSERT INTO produtos (restauranteId, nome, descricao, preco, etc...)
                  VALUES ($1, $2, $3, ...)
                  RETURNING *`;
    const result = await client.query(query, values);
    */

    const novoProduto = await db.Produtos.create(req.body);

    res.status(201).json(novoProduto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erro ao cadastrar produto" });
  }
};

const findById = async (req, res) => {
  try {
    const produto = await db.Produtos.findOne({
      where: { restauranteId: req.params.restauranteId },
      attributes: ["id", "nome"],
    });

    // const query = `SELECT id, nome FROM produtos WHERE restauranteId = $1`;
    // const result = await client.query(query, [req.params.restauranteId]);
    // console.log(`Produto encontrado: ${result.rows}`);
    // res.status(200).json(result.rows);

    res.status(200).json(produto);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao buscar produtos do restaurante",
    });
  }
};

const update = async (req, res) => {
  try {
    /* 
    const query = `UPDATE produtos
                  SET nome = $1, descricao = $2, preco = $3, etc...
                  WHERE id = $4
                  RETURNING *`;
    const result = await client.query(query, values);
    */

    const [affectedCount] = await db.Produtos.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedCount > 0) {
      const produtoAtualizado = await db.Produtos.findOne({
        where: { id: req.params.id },
      });

      return res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({
        message: "Produto não encontrado ou não foi atualizado",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao atualizar produto",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    /* 
    const query = `DELETE FROM produtos
                  WHERE id = $1
                  RETURNING *`;
    const result = await client.query(query, [req.params.id]);
    */

    const deletedCount = await db.Produtos.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Produto excluído com sucesso",
      deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao excluir produto",
      error: error.message,
    });
  }
};

module.exports = {
  createNew,
  findById,
  update,
  findAll,
  destroy,
};
