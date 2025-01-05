const express = require("express");
const router = express.Router();
const restaurantes = require("../../controllers/restaurantes.controller");
const {
  createRestaurantesSchema,
  updateRestauranteSchema,
} = require("../../schemas/restaurantes.schema");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         inicio:
 *           type: string
 *           description: Horário de início no formato HH:mm
 *           example: "09:00"
 *         fim:
 *           type: string
 *           description: Horário de fim no formato HH:mm
 *           example: "18:00"
 *       required:
 *         - inicio
 *         - fim
 *
 *     Restaurantes:
 *       type: object
 *       properties:
 *         foto:
 *           type: string
 *           description: URL da foto do restaurante
 *           example: "https://link-da-foto.com/foto.jpg"
 *         nome:
 *           type: string
 *           description: Nome do restaurante
 *           example: "Restaurante Exemplo"
 *         endereco:
 *           type: string
 *           description: Endereço do restaurante
 *           example: "Rua Exemplo, 123"
 *         horarioSemana:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Horario'
 *           description: Horários de funcionamento durante a semana (segunda à sexta-feira)
 *           example:
 *             - inicio: "09:00"
 *               fim: "18:00"
 *             - inicio: "09:00"
 *               fim: "12:00"
 *         horarioFimSemana:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Horario'
 *           description: Horários de funcionamento durante o fim de semana (sábado e domingo)
 *           example:
 *             - inicio: "11:00"
 *               fim: "20:00"
 *             - inicio: "12:00"
 *               fim: "22:00"
 *       required:
 *         - nome
 *         - endereco
 */

/**
 * @swagger
 * tags:
 *   name: Restaurantes
 *   description: gerenciamento de restaurantes
 */

/**
 * @swagger
 * /restaurantes:
 *   get:
 *     summary: Lista todos os restaurantes (somente nome e ID)
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: lista de restaurantes (somente nome e ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "8d46185d-34a0-49f9-9e5a-98c35bj32j1j10"
 *                   nome:
 *                     type: string
 *                     example: "Restaurante A"
 *                 required:
 *                   - id
 *                   - nome
 */

router.get("/", restaurantes.findAll);

/**
 * @swagger
 * /restaurantes/data:
 *   get:
 *     summary: Lista todos os dados dos restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: lista de restaurantes com todos os dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurantes'
 *             example:
 *               - foto: "https://link-da-foto.com/foto.jpg"
 *                 nome: "Restaurante Exemplo"
 *                 endereco: "Rua Exemplo, 123"
 *                 horarioSemana:
 *                   - inicio: "09:00"
 *                     fim: "18:00"
 *                   - inicio: "09:00"
 *                     fim: "12:00"
 *                 horarioFimSemana:
 *                   - inicio: "11:00"
 *                     fim: "20:00"
 *                   - inicio: "12:00"
 *                     fim: "22:00"
 */

router.get("/data", restaurantes.findAllData);

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: Cadastra um novo restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurantes'
 *           example:
 *             foto: "https://link-da-foto.com/foto.jpg"
 *             nome: "Restaurante Novo"
 *             endereco: "Rua Nova, 456"
 *             horarioSemana:
 *               - inicio: "08:00"
 *                 fim: "17:00"
 *             horarioFimSemana:
 *               - inicio: "10:00"
 *                 fim: "22:00"
 *     responses:
 *       201:
 *         description: Restaurante cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restaurante criado com sucesso"
 *                 restaurante:
 *                   $ref: '#/components/schemas/Restaurantes'
 */

router.post("/", validate(createRestaurantesSchema), restaurantes.createNew);

/**
 * @swagger
 * /restaurantes/{id}:
 *   put:
 *     summary: Atualiza um restaurante
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurantes'
 *           example:
 *             nome: "Restaurante Atualizado"
 *             endereco: "Rua Atualizada, 789"
 *             horarioSemana:
 *               - inicio: "08:00"
 *                 fim: "18:00"
 *             horarioFimSemana:
 *               - inicio: "11:00"
 *                 fim: "21:00"
 *     responses:
 *       200:
 *         description: Restaurante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restaurante atualizado com sucesso"
 *                 restaurante:
 *                   $ref: '#/components/schemas/Restaurantes'
 */

router.put("/:id", validate(updateRestauranteSchema), restaurantes.update);

/**
 * @swagger
 * /restaurantes/{id}:
 *   delete:
 *     summary: Exclui um restaurante
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do restaurante
 *     responses:
 *       200:
 *         description: Restaurante excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restaurante excluído com sucesso"
 */

router.delete("/:id", validate(updateRestauranteSchema), restaurantes.destroy);

module.exports = router;
