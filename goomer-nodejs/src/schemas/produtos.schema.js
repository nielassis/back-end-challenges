const { z } = require("zod");

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Horário deve estar no formato HH:mm");

const promotionScheduleSchema = z.object({
  dia: z
    .string()
    .min(1, "O dia da semana deve ser válido (ex.: Segunda-feira)")
    .max(20, "Nome do dia da semana muito longo")
    .optional(),
  inicio: timeSchema.optional(),
  fim: timeSchema.optional(),
});

const createProdutosSchema = z.object({
  restauranteId: z.string().uuid("O restauranteId deve ser válido"),
  nome: z.string().min(1, "O nome do produto deve ter pelo menos 1 caractere"),
  foto: z.string().url("A foto do produto deve ser uma URL válida"),
  categoria: z.string().min(1, "A categoria do produto é obrigatória"),
  preco: z.number().positive("O preço do produto deve ser maior que 0"),
  descricaoPromocao: z.string().optional(),
  precoPromocional: z
    .number()
    .positive("O preço promocional deve ser maior que 0")
    .optional(),
  diasPromocao: z.array(promotionScheduleSchema).optional(),
});

const updateProdutoSchema = z.object({
  nome: z.string().optional(),
  foto: z.string().url("A foto do produto deve ser uma URL válida").optional(),
  categoria: z.string().optional(),
  preco: z
    .number()
    .positive("O preço do produto deve ser maior que 0")
    .optional(),
  promocao: z
    .object({
      dia: z.string().optional(),
      inicio: timeSchema.optional(),
      fim: timeSchema.optional(),
    })
    .optional(),
});

module.exports = {
  createProdutosSchema,
  updateProdutoSchema,
};
