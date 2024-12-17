import {z} from "zod";

export const UpdateTransactionDto = z.object({
    userId: z.string().uuid().optional(),
    amount: z.number().optional(),
    typeId: z.string().optional(),
    statusId: z.string().optional(),
    pixKey: z.string().optional(),
})