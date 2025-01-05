const express = require("express");
const router = express.Router();
const restaurantes = require("../../controllers/restaurantes.controller");
const {
  createRestaurantesSchema,
  updateRestaurantesSchema,
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
 *                 $ref: '#/components/schemas/Restaurantes'
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
 */

router.get("/data", restaurantes.findAllData);

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: cadastra um restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *               nome:
 *                 type: string
 *               horarioFuncionamento:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: restaurante cadastrado com sucesso
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
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *               nome:
 *                 type: string
 *               horarioFuncionamento:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: restaurante atualizado
 */

router.put("/:id", validate(updateRestaurantesSchema), restaurantes.update);

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
 *         description: Restaurante excluído
 */

router.delete("/:id", validate(updateRestaurantesSchema), restaurantes.destroy);

module.exports = router;
