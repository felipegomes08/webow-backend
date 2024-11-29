import {IRefreshToken} from "@interfaces/refresh-token";
import {IUser} from "@interfaces/user";

export class RefreshToken implements IRefreshToken {
    private _id?: string;
    private _token: string;
    private _userId: string;
    private _user?: IUser;
    private _expiresAt: Date;
    private _revoked: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(data: IRefreshToken) {
        this._id = data.id;
        this._token = data.token;
        this._userId = data.userId;
        this._expiresAt = data.expiresAt;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._revoked = data.revoked;
        this._user = data.user;
    }

    // Getters e Setters
    get id(): string | undefined {
        return this._id;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get user(): IUser | undefined {
        return this._user;
    }

    set user(value: IUser | undefined) {
        this._user = value;
    }

    get expiresAt(): Date {
        return this._expiresAt;
    }

    set expiresAt(value: Date) {
        this._expiresAt = value;
    }

    get revoked(): boolean {
        return this._revoked;
    }

    set revoked(value: boolean) {
        this._revoked = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}
