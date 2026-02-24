import { z } from "zod";
import { SecretType } from "@/generated/prisma";

export const createSecretSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),
  secret: z
    .string()
    .min(1, "El secreto no puede estar vacío")
    .max(1000, "El secreto no puede tener más de 1000 caracteres"),
  type: z.enum(["normal", "medio", "hard"] as [SecretType, ...SecretType[]], {
    error: "Tipo inválido",
  }),
  favorite: z.boolean().default(false),
});

export const updateSecretSchema = createSecretSchema.partial().extend({
  id: z.string(),
});

export const deleteSecretSchema = z.object({
  id: z.string(),
});

export type CreateSecretSchema = z.infer<typeof createSecretSchema>;
export type UpdateSecretSchema = z.infer<typeof updateSecretSchema>;
export type DeleteSecretSchema = z.infer<typeof deleteSecretSchema>;