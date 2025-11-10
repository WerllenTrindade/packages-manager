// schemas/statusModal.ts
import { z } from "zod";

export const PackageStatusEnum = z.enum([
  "Coletado",
  "Em rota de entrega",
  "Entregue",
]);

export const ApplyToEnum = z.enum(["single", "all"]);

export const packageStatusSchema = z.object({
  status: PackageStatusEnum,
  clientName: z
    .string()
    .trim()
    .min(2, "Nome do recebedor deve ter pelo menos 2 caracteres")
    .optional(),
}).superRefine((data, ctx) => {
  if (data.status === "Entregue" && (!data.clientName || data.clientName.trim() === "")) {
    ctx.addIssue({
      path: ["clientName"],
      code: z.ZodIssueCode.custom,
      message: "Nome do recebedor é obrigatório quando status for 'Entregue'",
    });
  }
});

