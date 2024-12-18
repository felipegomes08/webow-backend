import {z} from "zod";

export const CreateMatchDto = z.object({
    userId: z.string().uuid(),
    matchResultId: z.string().uuid(),
    amount: z.number().positive()
})