const { z } = require("zod");

const createRestaurantesSchema = z.object({
  foto: z.string().url("A foto do restaurante deve ser uma url valida"),
  nome: z
    .string()
    .min(8, "O nome do restaurante deve ter pelo menos 8 caracteres"),
  horarioFuncionamento: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, "O horario deve ser no formato HH:MM:SS"),
  endereco: z
    .string()
    .min(8, "O endereço do restaurante deve ter pelo menos 8 caracteres"),
});

const updateRestaurantesSchema = z.object({
  foto: z.string().url().optional(),
  nome: z.string().min(8).optional(),
  horarioFuncionamento: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/)
    .optional(),
  endereco: z.string().min(8).optional(),
});

module.exports = {
  createRestaurantesSchema,
  updateRestaurantesSchema,
};
