import { TicketMessage as PrismaTicketMessage } from "@prisma/client";
import { TicketMessage } from "@domain/entities";
import { ITicket } from "@interfaces/ticket";
import { IUser } from "@interfaces/user";

export interface TicketMessagePrismaWithJoins extends PrismaTicketMessage {
    ticket?: ITicket;
    sender?: IUser;
}

export class TicketMessageMapper {
    static toDomain(data: TicketMessagePrismaWithJoins): TicketMessage {
        return new TicketMessage({
            id: data.id,
            ticketId: data.ticketId,
            senderId: data.senderId,
            content: data.content,
            createdAt: data.createdAt,
            ticket: data.ticket,
            sender: data.sender,
        });
    }

    static toPrisma(domain: TicketMessage): Omit<PrismaTicketMessage, "id"> {
        return {
            ticketId: domain.ticketId,
            senderId: domain.senderId,
            content: domain.content,
            createdAt: domain.createdAt,
        };
    }

    static toController(domain: TicketMessage) {
        return {
            id: domain.id,
            ticketId: domain.ticketId,
            senderId: domain.senderId,
            content: domain.content,
            createdAt: domain.createdAt,
            ticket: domain.ticket,
            sender: domain.sender,
        };
    }
}
