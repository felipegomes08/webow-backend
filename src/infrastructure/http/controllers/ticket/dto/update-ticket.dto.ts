import {z} from "zod";

export const UpdateTicketDto = z.object({
    userId: z.string().uuid().optional(),
    supportId: z.string().uuid().optional(),
    subject: z.string().optional(),
    deleted: z.boolean().optional()
})