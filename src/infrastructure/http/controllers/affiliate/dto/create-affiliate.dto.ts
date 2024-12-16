import {z} from "zod";

export const CreateAffiliateDto = z.object({
    name: z.string().optional(),
    cpf: z.string().min(11),
    phone: z.string(),
    email: z.string().email().optional(),
    pixKey: z.string().optional(),
    password: z.string(),
    code: z.string(),
    link: z.string().optional(),
})