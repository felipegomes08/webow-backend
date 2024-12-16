import {z} from "zod";

export const UpdateAffiliateDto = z.object({
    name: z.string().optional(),
    cpf: z.string().min(11).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    pixKey: z.string().optional(),
    password: z.string().optional(),
    code: z.string().optional(),
    link: z.string().optional(),
})