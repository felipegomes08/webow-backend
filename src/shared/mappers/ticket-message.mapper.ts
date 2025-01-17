import {
    TicketMessage as PrismaTicketMessage,
    Ticket as PrismaTicket,
    User as PrismaUser,
} from "@prisma/client";
import { TicketMessage } from "@domain/entities";
import { ITicketMessage } from "@interfaces/ticket";
import {UserMapper} from "@shared/mappers/user.mapper";
import {TicketMapper} from "@shared/mappers/ticket.mapper";

export interface TicketMessagePrismaWithJoins extends PrismaTicketMessage {
    ticket?: PrismaTicket;
    sender?: PrismaUser;
}

export class TicketMessageMapper {
    static toDomain(data: TicketMessagePrismaWithJoins): ITicketMessage {
        return new TicketMessage({
            id: data.id,
            ticketId: data.ticketId,
            senderId: data.senderId,
            content: data.content,
            createdAt: data.createdAt,
            ticket: data.ticket,
            sender: {
                ...data.sender!,
                balance: data.sender!.balance.toNumber()
            },
        });
    }

    static toPrisma(domain: ITicketMessage): Omit<PrismaTicketMessage, "id"> {
        return {
            ticketId: domain.ticketId,
            senderId: domain.senderId,
            content: domain.content,
            createdAt: domain.createdAt,
        };
    }

    static toController(domain: ITicketMessage) {
        return {
            id: domain.id,
            ticketId: domain.ticketId,
            senderId: domain.senderId,
            content: domain.content,
            createdAt: domain.createdAt,
            ticket: domain.ticket ? TicketMapper.toController(domain.ticket) : null,
            sender: domain.sender ? UserMapper.toController(domain.sender) : null,
        };
    }
}
