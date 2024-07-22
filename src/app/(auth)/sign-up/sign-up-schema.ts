import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email é necessário" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(1, { message: "Password é necessária" })
      .min(8, { message: "Password deve conter no mínimo 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmar password é necessário" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
