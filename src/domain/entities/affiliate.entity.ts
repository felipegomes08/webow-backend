import { IUser } from "@interfaces/user";
import {IAffiliate} from "@interfaces/affiliate";

export class Affiliate implements IAffiliate {
    private _id?: string;
    private _code: string;
    private _userId: string;
    private _link: string;
    private _balance: number;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _active: boolean;
    private _user?: IUser;

    constructor(data: IAffiliate) {
        this._id = data.id;
        this._code = data.code;
        this._userId = data.userId;
        this._link = data.link;
        this._balance = data.balance;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._active = data.active;
        this._user = data.user;
    }

    get id(): string | undefined {
        return this._id;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get link(): string {
        return this._link;
    }

    set link(value: string) {
        this._link = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get user(): IUser | undefined {
        return this._user;
    }
}
