
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "O e-mail é obrigatório")
    .max(50, "O e-mail deve ter no máximo 50 caracteres")
    .email("Formato de e-mail inválido"),

  password: z
    .string()
    .min(1, "A senha é obrigatória"),
});