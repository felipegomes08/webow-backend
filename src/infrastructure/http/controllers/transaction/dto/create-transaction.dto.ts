import {z} from "zod";

export const CreateTransactionDto = z.object({
    userId: z.string().uuid(),
    amount: z.number(),
})