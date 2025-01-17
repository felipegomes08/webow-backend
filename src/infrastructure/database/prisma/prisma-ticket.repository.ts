import { PrismaClient } from "@prisma/client";
import {TicketRepository} from "@domain/repositories";
import {IGetAllTicketsParams, ITicket} from "@interfaces/ticket";
import {TicketMapper} from "@shared/mappers";
import {transformGetAllTicketsParams} from "@shared/utils";

export class PrismaTicketRepository implements TicketRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: ITicket): Promise<ITicket> {
        return TicketMapper.toDomain(
            await this.prisma.ticket.create({
                data: TicketMapper.toPrisma(data),
                include: {
                    user: true,
                    support: true
                }
            })
        )
    }

    async update(id: string, data: ITicket): Promise<ITicket> {
        return TicketMapper.toDomain(
            await this.prisma.ticket.update({
                where: {
                    id
                },
                data: TicketMapper.toPrisma(data),
                include: {
                    user: true,
                    support: true
                }
            })
        )
    }

    async getOneById(id: string): Promise<ITicket | null> {
        const ticket = await this.prisma.ticket.findFirst({
            where: {
                id
            },
            include: {
                user: true,
                support: true
            }
        })

        if (!ticket) return null;

        return TicketMapper.toDomain(ticket)
    }

    async getAll(params: IGetAllTicketsParams): Promise<ITicket[]> {
        const matchParams = transformGetAllTicketsParams(params)

        const tickets = !params?.page
            ? await this.prisma.ticket.findMany({
                where: matchParams,
                include: {
                   user: true,
                    support: true
                }
            })
            : await this.prisma.ticket.findMany({
                where: matchParams,
                skip: (params.page - 1) * (params?.limit ?? 25),
                take: params?.limit ?? 25,
                include: {
                    user: true,
                    support: true
                }
            });

        return tickets.map(TicketMapper.toDomain);
    }

    count(params: IGetAllTicketsParams): Promise<number> {
        const matchParams = transformGetAllTicketsParams(params)

        return this.prisma.ticket.count({
            where: matchParams
        })
    }
}