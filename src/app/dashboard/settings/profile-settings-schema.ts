import { z } from "zod";

export const profileSettingsSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.union([
    z.literal(""),
    z
      .string()
      .regex(/^(\+?351)?9\d\d{7}$/, { message: "Número de telefone inválido" }),
  ]),
});

export type ProfileSettingsSchema = z.infer<typeof profileSettingsSchema>;
