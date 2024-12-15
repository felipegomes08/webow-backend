import {IUser} from "@interfaces/user";
import {IMatch, IMatchResult} from "@interfaces/match";

export class Match implements IMatch {
    private _id?: string;
    private _userId: string;
    private _matchResultId: string;
    private _amount: number;
    private _createdAt: Date;
    private _user?: IUser;
    private _matchResult?: IMatchResult;

    constructor(data: IMatch) {
        this._id = data.id;
        this._userId = data.userId;
        this._matchResultId = data.matchResultId;
        this._amount = data.amount;
        this._createdAt = data.createdAt;
        this._user = data.user;
        this._matchResult = data.matchResult;
    }

    get id(): string | undefined {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get matchResultId(): string {
        return this._matchResultId;
    }

    get amount(): number {
        return this._amount;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get user(): IUser | undefined {
        return this._user;
    }

    get matchResult(): IMatchResult | undefined {
        return this._matchResult;
    }

}
