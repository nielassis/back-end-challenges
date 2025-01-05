const db = require("../models");

/* const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});

client.connect(); */

const findAll = async (req, res) => {
  try {
    const restaurantes = await db.Restaurante.findAll({
      attributes: ["id", "nome"],
    });

    // const result = await client.query("SELECT id, nome FROM restaurantes");
    // console.log(`Restaurantes encontrados: ${result.rows}`);
    // res.status(200).json(result.rows);

    console.log("Restaurantes encontrados:", restaurantes);
    res.status(200).json(restaurantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao buscar restaurantes",
    });
  }
};

const findAllData = async (req, res) => {
  try {
    const restaurantes = await db.Restaurante.findAll();

    // const result = await client.query("SELECT * FROM restaurantes");
    // console.log(`Informações de ${result.rows.count} Restaurantes encontrados: ${result.rows}`);
    // res.status(200).json(result.rows);

    console.log("Restaurantes encontrados:", restaurantes);
    res.status(200).json(restaurantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao buscar informações de restaurantes",
    });
  }
};

const createNew = async (req, res) => {
  try {
    const { foto, nome, horarioFuncionamento, endereco } = req.body;

    if (!foto || !nome || !horarioFuncionamento || !endereco) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    /* 
    const query = `INSERT INTO restaurantes (foto, nome, horarioFuncionamento, endereco) 
                  VALUES ( $1, $2, $3, $4) 
                  RETURNING *`;

    const result = await client.query(query, values);
    */

    const novoRestaurante = await db.Restaurante.create({
      foto,
      nome,
      horarioFuncionamento,
      endereco,
    });

    res.status(201).json({
      message: "Restaurante criado com sucesso",
      restaurante: novoRestaurante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao cadastrar Restaurante",
      error,
    });
  }
};

const update = async (req, res) => {
  try {
    /* 
        
    const query = `UPDATE restaurantes
                  SET foto = $1, nome = $2, horarioFuncionamento = $3, endereco = $4
                  WHERE id = $5
                  RETURNING *
    `;

    const result = await client.query(query, values);
      */

    const [affectedCount] = await db.Restaurante.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedCount > 0) {
      const newRestaurante = await db.Restaurante.findOne({
        where: { id: req.params.id },
      });

      return res.json(newRestaurante);
    } else {
      throw new Error("Restaurante não encontrado ou não foi atualizado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao atualizar Restaurante",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    /* 
    const query = `DELETE FROM restaurantes 
                  WHERE id = $1
                  RETURNING *`;

    const result = await client.query(query, [req.params.id]); 
    */
    const deletedCount = await db.Restaurante.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Restaurante excluido com sucesso",
      deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao excluir Restaurante",
      error: error.message,
    });
  }
};

module.exports = {
  findAll,
  findAllData,
  createNew,
  update,
  destroy,
};
