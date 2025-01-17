import {z} from "zod";

export const SendTicketMessageDto = z.object({
    ticketId: z.string().uuid(),
    senderId: z.string().uuid(),
    content: z.string()
})