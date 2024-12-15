import { IUser } from "@interfaces/user";
import {ITicket} from "@interfaces/ticket";

export class Ticket implements ITicket {
    private _id?: string;
    private _userId: string;
    private _supportId: string;
    private _subject: string;
    private _createdAt: Date;
    private _closedAt: Date;
    private _user?: IUser;
    private _support?: IUser;

    constructor(data: ITicket) {
        this._id = data.id;
        this._userId = data.userId;
        this._supportId = data.supportId;
        this._subject = data.subject;
        this._createdAt = data.createdAt;
        this._closedAt = data.closedAt;
        this._user = data.user;
        this._support = data.support;
    }

    get id(): string | undefined {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get supportId(): string {
        return this._supportId;
    }

    get subject(): string {
        return this._subject;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get closedAt(): Date {
        return this._closedAt;
    }

    get user(): IUser | undefined {
        return this._user;
    }

    get support(): IUser | undefined {
        return this._support;
    }
}
