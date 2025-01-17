import {TicketMessageRepository} from "@domain/repositories";
import {PrismaClient} from "@prisma/client";
import {ITicketMessage} from "@interfaces/ticket";
import {TicketMessageMapper} from "@shared/mappers";

export class PrismaTicketMessageRepository implements TicketMessageRepository  {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: ITicketMessage): Promise<ITicketMessage> {
        return TicketMessageMapper.toDomain(
            await this.prisma.ticketMessage.create({
                data: TicketMessageMapper.toPrisma(data),
                include: {
                    sender: true,
                    ticket: {
                        include: {
                            support: true,
                            user: true
                        }
                    }
                }
            })
        );
    }

    async getAllByTicketId(ticketId: string): Promise<ITicketMessage[]> {
        const messages = await this.prisma.ticketMessage.findMany({
            where: {
                ticketId: ticketId
            },
            include: {
                sender: true,
                ticket: {
                    include: {
                        support: true,
                        user: true
                    }
                }
            }
        })

        return messages.map(TicketMessageMapper.toDomain)
    }

}