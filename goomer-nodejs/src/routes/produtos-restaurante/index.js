const express = require("express");
const router = express.Router();
const produtos = require("../../controllers/produtos.controller");
const {
  createProdutosSchema,
  updateProdutoSchema,
} = require("../../schemas/produtos.schema");

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
 *   name: Produtos
 *   description: gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: cadastra um produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               restauranteId:
 *                 type: string
 *     responses:
 *       201:
 *         description: produto cadastrado com sucesso
 */
router.post("/", validate(createProdutosSchema), produtos.createNew);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produtos'
 */

router.get("/", produtos.findAll);

/**
 * @swagger
 * /produtos/{restauranteId}:
 *   get:
 *     summary: Busca produtos por restaurante
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: restauranteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do restaurante
 *     responses:
 *       200:
 *         description: Produtos do restaurante
 */

router.get("/:restauranteId", produtos.findById);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 */

router.put("/:id", validate(updateProdutoSchema), produtos.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído
 */

router.delete("/:id", validate(updateProdutoSchema), produtos.destroy);

module.exports = router;
