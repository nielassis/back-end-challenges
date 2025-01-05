const { z } = require("zod");

const createProdutosSchema = z.object({
  nome: z.string().min(1, "O nome do produto deve ter pelo menos 1 caractere"),
  preco: z.number().positive("O preco do produto deve ser maior que 0."),
  restauranteId: z.string().uuid("O restauranteId deve ser valido"),
});

const updateProdutoSchema = z.object({
  nome: z.string().optional(),
  preco: z.number().positive().optional(),
});

module.exports = {
  createProdutosSchema,
  updateProdutoSchema,
};
