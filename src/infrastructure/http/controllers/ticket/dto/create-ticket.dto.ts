import {z} from "zod";

export const CreateTicketDto = z.object({
    userId: z.string().uuid(),
    subject: z.string()
})