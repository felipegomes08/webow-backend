import { IUser } from "@interfaces/user";
import {ITicket} from "@interfaces/ticket";

export class Ticket implements ITicket {
    private _id?: string;
    private _userId: string;
    private _supportId: string | null;
    private _subject: string;
    private _createdAt: Date;
    private _closedAt: Date | null;
    private _deleted: boolean;
    private _user?: IUser | null;
    private _support?: IUser | null;

    constructor(data: ITicket) {
        this._id = data.id;
        this._userId = data.userId;
        this._supportId = data.supportId;
        this._subject = data.subject;
        this._createdAt = data.createdAt;
        this._closedAt = data.closedAt;
        this._deleted = data.deleted
        this._user = data.user;
        this._support = data.support;
    }

    get id(): string | undefined {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get supportId(): string | null {
        return this._supportId;
    }

    get subject(): string {
        return this._subject;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get closedAt(): Date | null {
        return this._closedAt;
    }

    get deleted(): boolean {
        return this._deleted;
    }

    get user(): IUser | null | undefined {
        return this._user;
    }

    get support(): IUser | null | undefined {
        return this._support;
    }

    set id(value: string) {
        this._id = value;
    }

    set userId(value: string) {
        this._userId = value;
    }

    set supportId(value: string | null) {
        this._supportId = value;
    }

    set subject(value: string) {
        this._subject = value;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    set closedAt(value: Date | null) {
        this._closedAt = value;
    }

    set deleted(value: boolean) {
        this._deleted = value;
    }

    set user(value: IUser | null) {
        this._user = value;
    }

    set support(value: IUser | null) {
        this._support = value;
    }
}
