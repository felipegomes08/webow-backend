import {IGetAllTicketsParams, ITicket} from "@interfaces/ticket";

export abstract class TicketRepository {

    abstract create(data: ITicket): Promise<ITicket>

    abstract update(id: string, data: ITicket): Promise<ITicket>

    abstract getOneById(id: string): Promise<ITicket | null>

    abstract getAll(params: IGetAllTicketsParams): Promise<ITicket[]>

    abstract count(params: IGetAllTicketsParams): Promise<number>

}