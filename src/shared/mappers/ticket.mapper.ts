import { Ticket as PrismaTicket, User as PrismaUser } from "@prisma/client";
import { Ticket } from "@domain/entities";
import {ITicket} from "@interfaces/ticket";
import {UserMapper} from "@shared/mappers/user.mapper";

export interface TicketPrismaWithJoins extends PrismaTicket {
    user?: PrismaUser | null;
    support?: PrismaUser | null;
}

export class TicketMapper {
    static toDomain(data: TicketPrismaWithJoins): Ticket {
        return new Ticket({
            id: data.id,
            userId: data.userId,
            supportId: data.supportId,
            subject: data.subject,
            createdAt: data.createdAt,
            closedAt: data.closedAt,
            deleted: data.deleted,
            user: data.user ? {
                ...data.user!,
                balance: data.user!.balance.toNumber()
            } : null,
            support: data.support! ? {
                ...data.support!,
                balance: data.support!.balance.toNumber()
            } : null,
        });
    }

    static toPrisma(domain: ITicket): Omit<PrismaTicket, "id" | "supportId"> {
        return {
            userId: domain.userId,
            subject: domain.subject,
            createdAt: domain.createdAt,
            closedAt: domain.closedAt,
            deleted: domain.deleted
        };
    }

    static toController(domain: ITicket) {
        return {
            id: domain.id,
            userId: domain.userId,
            supportId: domain.supportId,
            subject: domain.subject,
            createdAt: domain.createdAt,
            closedAt: domain.closedAt,
            deleted: domain.deleted,
            user: domain.user ? UserMapper.toController(domain.user): null,
            support: domain.support ? UserMapper.toController(domain.support) : null,
        };
    }
}
