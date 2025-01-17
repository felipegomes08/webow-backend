import {
    ICreateTicketParams,
    IGetAllTicketsParams, IGetAllTicketsResponse, ISendTicketMessageParams,
    ITicket, ITicketMessage,
    ITicketService,
    IUpdateTicketParams
} from "@interfaces/ticket";
import {TicketMessageRepository, TicketRepository, UserRepository} from "@domain/repositories";
import {NotFoundTicketException, NotFoundUserException} from "@domain/exceptions";
import {Ticket, TicketMessage} from "@domain/entities";

export class TicketService implements ITicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly ticketMessageRepository: TicketMessageRepository,
        private readonly userRepository: UserRepository,
    )
    {}

    async create(params: ICreateTicketParams): Promise<ITicket> {
        const user = await this.userRepository.findOneById(params.userId);

        if (!user) {
            throw new NotFoundUserException()
        }

        return await this.ticketRepository.create(
            new Ticket({
                userId: user.id,
                subject: params.subject,
                supportId: null,
                deleted: false,
                closedAt: null,
                createdAt: new Date()
            })
        )
    }

    async update(id: string, params: IUpdateTicketParams): Promise<ITicket> {
        const ticket = await this.ticketRepository.getOneById(id)

        if (!ticket) {
            throw new NotFoundTicketException()
        }

        Object.assign(ticket, params)

        return await this.ticketRepository.update(id, ticket)
    }

    async delete(id: string): Promise<void> {
        const ticket = await this.ticketRepository.getOneById(id)

        if (!ticket) {
            throw new NotFoundTicketException()
        }

        ticket.deleted = true
        ticket.closedAt = new Date()

        await this.ticketRepository.update(id, ticket)
    }

    async getOneById(id: string): Promise<ITicket | null> {
        return await this.ticketRepository.getOneById(id)
    }

    async getAll(params: IGetAllTicketsParams): Promise<IGetAllTicketsResponse> {
        const tickets = await this.ticketRepository.getAll(params);
        const countAllTickets = await this.ticketRepository.count(params);

        return {
            tickets,
            page: params.page ?? null,
            total: countAllTickets
        }
    }

    async sendMessage(params: ISendTicketMessageParams): Promise<ITicketMessage> {
        const ticket = await this.ticketRepository.getOneById(params.ticketId)

        if (!ticket) {
            throw new NotFoundTicketException()
        }

        const user = await this.userRepository.findOneById(params.senderId);

        if (!user) {
            throw new NotFoundUserException()
        }

        return await this.ticketMessageRepository.create(
            new TicketMessage({
                ticketId: params.ticketId,
                senderId: params.senderId,
                content: params.content,
                createdAt: new Date()
            })
        )
    }

    async getAllMessages(ticketId: string): Promise<ITicketMessage[]> {
        const ticket = await this.ticketRepository.getOneById(ticketId)

        if (!ticket) {
            throw new NotFoundTicketException()
        }

        return await this.ticketMessageRepository.getAllByTicketId(ticketId)
    }

}