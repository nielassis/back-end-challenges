const db = require("../models");
const {
  createRestaurantesSchema,
  updateRestauranteSchema,
} = require("../schemas/restaurantes.schema");

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
    const { foto, nome, horarioSemana, horarioFimSemana, endereco } = req.body;

    const parsed = createRestaurantesSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Erro na validação dos dados",
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    /*
    const query = `
      INSERT INTO Restaurantes (foto, nome, horarioSemana, horarioFimSemana, endereco)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const values = [foto, nome, horarioSemana, horarioFimSemana, endereco];

    const result = await client.query(query, values);
    */

    const restaurante = await db.Restaurante.create({
      foto,
      nome,
      horarioSemana,
      horarioFimSemana,
      endereco,
    });
    res.status(201).json({
      message: "Restaurante criado com sucesso",
      restaurante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro ao cadastrar Restaurante",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { foto, nome, endereco, horarioSemana, horarioFimSemana } = req.body;

    const parsed = updateRestauranteSchema.safeParse({
      foto,
      nome,
      endereco,
      horarioSemana,
      horarioFimSemana,
    });

    if (!parsed.success) {
      return res.status(400).json({
        message: "Erro na validação dos dados.",
        errors: parsed.error.errors,
      });
    }

    const restaurante = await db.Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante não encontrado.",
      });
    }

    await restaurante.update({
      foto: foto || restaurante.foto,
      nome: nome || restaurante.nome,
      endereco: endereco || restaurante.endereco,
      horarioSemana: horarioSemana || restaurante.horarioSemana,
      horarioFimSemana: horarioFimSemana || restaurante.horarioFimSemana,
    });

    res.status(200).json({
      message: "Restaurante atualizado com sucesso!",
      restaurante,
    });

    /*
    const query = `UPDATE restaurantes 
                   SET foto = COALESCE($1, foto), 
                       nome = COALESCE($2, nome), 
                       endereco = COALESCE($3, endereco), 
                       horarioSemana = COALESCE($4, horarioSemana), 
                       horarioFimSemana = COALESCE($5, horarioFimSemana)
                   WHERE id = $6
                   RETURNING *`;

    const result = await client.query(query, [foto, nome, endereco, horarioSemana, horarioFimSemana, id]);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Restaurante atualizado com sucesso!",
        restaurante: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Restaurante não encontrado.",
      });
    }
    */
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao atualizar restaurante.",
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
