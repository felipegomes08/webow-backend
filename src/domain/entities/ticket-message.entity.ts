import {ITicket, ITicketMessage} from "@interfaces/ticket";
import { IUser } from "@interfaces/user";

export class TicketMessage implements ITicketMessage{
    private _id?: string;
    private _ticketId: string;
    private _senderId: string;
    private _content: string;
    private _createdAt: Date;
    private _ticket?: ITicket;
    private _sender?: IUser;

    constructor(data: ITicketMessage) {
        this._id = data.id;
        this._ticketId = data.ticketId;
        this._senderId = data.senderId;
        this._content = data.content;
        this._createdAt = data.createdAt;
        this._ticket = data.ticket;
        this._sender = data.sender;
    }

    get id(): string | undefined {
        return this._id;
    }

    get ticketId(): string {
        return this._ticketId;
    }

    get senderId(): string {
        return this._senderId;
    }

    get content(): string {
        return this._content;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get ticket(): ITicket | undefined {
        return this._ticket;
    }

    get sender(): IUser | undefined {
        return this._sender;
    }
}
