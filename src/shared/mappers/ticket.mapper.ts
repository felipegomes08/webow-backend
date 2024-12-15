import { Ticket as PrismaTicket, User as PrismaUser } from "@prisma/client";
import { Ticket } from "@domain/entities";

export interface TicketPrismaWithJoins extends PrismaTicket {
    user: PrismaUser;
    support: PrismaUser;
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
            user: {
                ...data.user,
                balance: data.user.balance.toNumber()
            },
            support: {
                ...data.support,
                balance: data.support.balance.toNumber()
            },
        });
    }

    static toPrisma(domain: Ticket): Omit<PrismaTicket, "id"> {
        return {
            userId: domain.userId,
            supportId: domain.supportId,
            subject: domain.subject,
            createdAt: domain.createdAt,
            closedAt: domain.closedAt,
        };
    }

    static toController(domain: Ticket) {
        return {
            id: domain.id,
            userId: domain.userId,
            supportId: domain.supportId,
            subject: domain.subject,
            createdAt: domain.createdAt,
            closedAt: domain.closedAt,
            user: domain.user,
            support: domain.support,
        };
    }
}
