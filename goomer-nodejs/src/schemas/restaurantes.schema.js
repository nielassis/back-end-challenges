const { z } = require("zod");

const horarioPattern = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
const validateHorario = (horario) => horarioPattern.test(horario);

const validateIntervalo = (inicio, fim) => {
  const [startHour, startMin] = inicio.split(":").map(Number);
  const [endHour, endMin] = fim.split(":").map(Number);

  const startTimeInMinutes = startHour * 60 + startMin;
  const endTimeInMinutes = endHour * 60 + endMin;

  return endTimeInMinutes - startTimeInMinutes >= 15;
};

const validateHorarios = (horarios) => {
  return horarios.every(({ inicio, fim }) => {
    if (!validateHorario(inicio) || !validateHorario(fim)) {
      return false;
    }
    return validateIntervalo(inicio, fim);
  });
};

const createRestaurantesSchema = z.object({
  foto: z.string().url("A foto do restaurante deve ser uma url válida"),
  nome: z
    .string()
    .min(8, "O nome do restaurante deve ter pelo menos 8 caracteres"),
  horarioSemana: z
    .array(
      z.object({
        inicio: z.string().refine(validateHorario, "Horário inválido"),
        fim: z.string().refine(validateHorario, "Horário inválido"),
      })
    )
    .refine(
      validateHorarios,
      "Os intervalos entre os horários devem ser de pelo menos 15 minutos."
    ),
  horarioFimSemana: z
    .array(
      z.object({
        inicio: z.string().refine(validateHorario, "Horário inválido"),
        fim: z.string().refine(validateHorario, "Horário inválido"),
      })
    )
    .refine(
      validateHorarios,
      "Os intervalos entre os horários devem ser de pelo menos 15 minutos."
    ),
  endereco: z
    .string()
    .min(8, "O endereço do restaurante deve ter pelo menos 8 caracteres"),
});

const updateRestauranteSchema = z.object({
  foto: z.string().url("URL de foto inválida.").optional(),
  nome: z
    .string()
    .min(3, "O nome do restaurante deve ter pelo menos 3 caracteres.")
    .max(100, "O nome do restaurante não pode ter mais de 100 caracteres.") // Limitação de tamanho opcional
    .optional(),
  endereco: z
    .string()
    .min(5, "O endereço deve ter pelo menos 5 caracteres.")
    .max(255, "O endereço não pode ter mais de 255 caracteres.") // Limitação de tamanho opcional
    .optional(),
  horarioSemana: z
    .array(
      z.object({
        inicio: z
          .string()
          .regex(
            /^([0-9]{2}):([0-9]{2})$/,
            "Horário de início inválido, deve ser no formato HH:mm"
          )
          .refine(validateHorario, "Horário de início inválido"),
        fim: z
          .string()
          .regex(
            /^([0-9]{2}):([0-9]{2})$/,
            "Horário de fim inválido, deve ser no formato HH:mm"
          )
          .refine(validateHorario, "Horário de fim inválido"),
      })
    )
    .refine(
      validateHorarios,
      "Os intervalos entre os horários devem ser de pelo menos 15 minutos."
    )
    .optional(),
  horarioFimSemana: z
    .array(
      z.object({
        inicio: z
          .string()
          .regex(
            /^([0-9]{2}):([0-9]{2})$/,
            "Horário de início inválido, deve ser no formato HH:mm"
          )
          .refine(validateHorario, "Horário de início inválido"),
        fim: z
          .string()
          .regex(
            /^([0-9]{2}):([0-9]{2})$/,
            "Horário de fim inválido, deve ser no formato HH:mm"
          )
          .refine(validateHorario, "Horário de fim inválido"),
      })
    )
    .refine(
      validateHorarios,
      "Os intervalos entre os horários devem ser de pelo menos 15 minutos."
    )
    .optional(),
});

module.exports = {
  createRestaurantesSchema,
  updateRestauranteSchema,
};
