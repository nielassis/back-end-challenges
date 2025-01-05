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
 *   description: Gerenciamento de produtos, incluindo cadastro, atualização, consulta e exclusão.
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     description: Rota para cadastrar um produto em um restaurante, com dados validados.
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - restauranteId
 *               - foto
 *               - categoria
 *               - promocao
 *             properties:
 *               restauranteId:
 *                 type: string
 *                 format: uuid
 *               nome:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: uri
 *               categoria:
 *                 type: string
 *               preco:
 *                 type: number
 *               promocao:
 *                 type: object
 *                 properties:
 *                   descricaoPromocao:
 *                     type: string
 *                   precoPromocional:
 *                     type: number
 *                   diasPromocao:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         dia:
 *                           type: string
 *                         inicio:
 *                           type: string
 *                         fim:
 *                           type: string
 *                   horarioInicioPromocao:
 *                     type: string
 *                   horarioFimPromocao:
 *                     type: string
 *             example:
 *               restauranteId: "8d46185d-34a0-49f9-9e5a-98c35b282197"
 *               nome: "Hamburguer"
 *               foto: "https://example.com/Hamburguer.jpg"
 *               categoria: "Lanches"
 *               preco: 25.00
 *               promocao:
 *                 descricaoPromocao: "Promoção de Verão!"
 *                 precoPromocional: 20.00
 *                 diasPromocao:
 *                   - dia: "Segunda-feira"
 *                     inicio: "10:00"
 *                     fim: "18:00"
 *                   - dia: "Quarta-feira"
 *                     inicio: "10:00"
 *                     fim: "18:00"
 *                 horarioInicioPromocao: "10:00"
 *                 horarioFimPromocao: "18:00"
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do produto
 *                 nome:
 *                   type: string
 *                 preco:
 *                   type: number
 *                 restauranteId:
 *                   type: string
 *                 foto:
 *                   type: string
 *                 categoria:
 *                   type: string
 *                 promocao:
 *                   type: object
 *                   properties:
 *                     descricaoPromocao:
 *                       type: string
 *                     precoPromocional:
 *                       type: number
 *                     diasPromocao:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           dia:
 *                             type: string
 *                           inicio:
 *                             type: string
 *                           fim:
 *                             type: string
 *                     horarioInicioPromocao:
 *                       type: string
 *                     horarioFimPromocao:
 *                       type: string
 *       400:
 *         description: Erro de validação ou dados inválidos
 *       500:
 *         description: Erro no servidor
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
 *         description: Lista de produtos
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produtos'
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
 *                 description: Nome do produto.
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto.
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: Dados inválidos ou faltando
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
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
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete("/:id", validate(updateProdutoSchema), produtos.destroy);

module.exports = router;
