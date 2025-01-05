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

    /* 
    const query = "SELECT * FROM produtos";
    const result = await client.query(query);
    console.log(result.rows); 
    */

    res.status(200).json(produtos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erro ao buscar produtos" });
  }
};

const createNew = async (req, res) => {
  const { restauranteId, promocao, ...produto } = req.body;

  if (!restauranteId) {
    return res.status(400).json({
      message: "restauranteId é obrigatório",
    });
  }

  try {
    const novoProduto = await db.Produtos.create({
      ...produto,
      restauranteId,
      promocao: promocao || null,
    });

    /* 
    const query = `INSERT INTO produtos (restauranteId, nome, foto, categoria, preco, descricaoPromocao, precoPromocional, diasPromocao) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [restauranteId, produto.nome, produto.foto, produto.categoria, produto.preco, promocao?.descricaoPromocao, promocao?.precoPromocional, promocao?.diasPromocao];
    const result = await client.query(query, values);
    console.log(result.rows);
    */

    res.status(201).json(novoProduto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erro ao cadastrar produto" });
  }
};

const findById = async (req, res) => {
  try {
    const produto = await db.Produtos.findOne({
      where: { id: req.params.id },
    });

    if (!produto) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    /* 
    const query = "SELECT * FROM produtos WHERE id = $1";
    const result = await client.query(query, [req.params.id]);
    console.log(result.rows);
    */

    res.status(200).json(produto);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erro ao buscar produto",
    });
  }
};

const update = async (req, res) => {
  try {
    const produtoExistente = await db.Produtos.findOne({
      where: { id: req.params.id },
    });

    if (!produtoExistente) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    const [affectedCount] = await db.Produtos.update(req.body, {
      where: { id: req.params.id },
    });

    /* 
    const query = `UPDATE produtos SET nome = $1, foto = $2, categoria = $3, preco = $4, descricaoPromocao = $5, precoPromocional = $6, diasPromocao = $7
                   WHERE id = $8 RETURNING *`;
    const values = [req.body.nome, req.body.foto, req.body.categoria, req.body.preco, req.body.descricaoPromocao, req.body.precoPromocional, req.body.diasPromocao, req.params.id];
    const result = await client.query(query, values);
    console.log(result.rows);
    */

    if (affectedCount > 0) {
      const produtoAtualizado = await db.Produtos.findOne({
        where: { id: req.params.id },
      });

      return res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({
        message: "Produto não foi atualizado",
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
    const deletedCount = await db.Produtos.destroy({
      where: { id: req.params.id },
    });

    /* 
    const query = "DELETE FROM produtos WHERE id = $1 RETURNING *";
    const result = await client.query(query, [req.params.id]);
    console.log(result.rows);
    */

    if (deletedCount > 0) {
      res.status(200).json({
        message: "Produto excluído com sucesso",
        deletedCount,
      });
    } else {
      res.status(404).json({
        message: "Produto não encontrado",
      });
    }
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
