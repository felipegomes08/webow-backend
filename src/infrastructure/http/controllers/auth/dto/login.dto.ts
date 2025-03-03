import {z} from "zod";

const passwordSchema = z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/\d/, "A senha deve conter pelo menos um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial.");

export const LoginDto = z.object({
    login: z.string(),
    password: passwordSchema
})