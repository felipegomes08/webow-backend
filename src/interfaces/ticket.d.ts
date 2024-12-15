import {IUser} from "@interfaces/user";

export interface ITicket {
    id?: string
    userId: string
    supportId: string
    subject: string
    createdAt: Date
    closedAt: Date
    user?: IUser
    support?: IUser
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