import {IUser} from "@interfaces/user";
import {ITransaction, ITransactionStatus, ITransactionType} from "@interfaces/transaction";

export class Transaction {
    private _id?: string;
    private _userId: string;
    private _typeId: string;
    private _statusId: string;
    private _pixKey: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _amount: number;
    private _user?: IUser;
    private _type?: ITransactionType;
    private _status?: ITransactionStatus;

    constructor(data: ITransaction) {
        this._id = data.id;
        this._userId = data.userId;
        this._typeId = data.typeId;
        this._statusId = data.statusId;
        this._pixKey = data.pixKey;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._amount = data.amount;
        this._user = data.user;
        this._type = data.type;
        this._status = data.status;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get typeId(): string {
        return this._typeId;
    }

    public get statusId(): string {
        return this._statusId;
    }

    public get pixKey(): string {
        return this._pixKey;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get amount(): number {
        return this._amount;
    }

    public get user(): IUser | undefined {
        return this._user;
    }

    public get type(): ITransactionType | undefined {
        return this._type;
    }

    public get status(): ITransactionStatus | undefined {
        return this._status;
    }

    public set id(value: string | undefined) {
        this._id = value;
    }

    public set user(value: IUser | undefined) {
        this._user = value;
    }

    public set type(value: ITransactionType | undefined) {
        this._type = value;
    }

    public set status(value: ITransactionStatus | undefined) {
        this._status = value;
    }
}
