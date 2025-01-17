import { IRangeParam, IUser} from "@interfaces/user";

export interface ITicket {
    id?: string
    userId: string
    supportId: string | null
    subject: string
    createdAt: Date
    closedAt: Date | null
    deleted: boolean
    user?: IUser | null
    support?: IUser | null
}

export interface ITicketMessage {
    id?: string
    ticketId: string
    senderId: string
    content: string
    createdAt: Date
    ticket?: ITicket
    sender?: IUser
}

export interface IGetAllTicketsParams {
    id?: string
    userId?: string
    supportId?: string
    subject?: string
    createdAt?: IRangeParam<Date>
    closedAt?: IRangeParam<Date>
    deleted?: boolean
    page?: number
    limit?: number
}

export interface ICreateTicketParams {
    userId: string
    subject: string
}

export interface IUpdateTicketParams {
    userId?: string
    supportId?: string
    subject?: string
    deleted?: boolean
}

export interface ISendTicketMessageParams {
    ticketId: string
    senderId: string
    content: string
}

export interface IGetAllTicketsResponse {
    tickets: ITicket[]
    page: nunmber
    total: nunmber
}

export interface ITicketService {
    create(params: ICreateTicketParams): Promise<ITicket>
    update(id: string, params: IUpdateTicketParams): Promise<ITicket>
    delete(id: string): Promise<void>
    getOneById(id: string): Promise<ITicket | null>
    getAll(params: IGetAllTicketsParams): Promise<IGetAllTicketsResponse>
    sendMessage(params: ISendTicketMessageParams): Promise<ITicketMessage>
    getAllMessages(ticketId: string): Promise<ITicketMessage[]>
}