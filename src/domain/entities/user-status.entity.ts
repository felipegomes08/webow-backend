import {IUserStatus} from "@interfaces/user";

export class UserStatus implements IUserStatus {
    private _id?: string;
    private _name: string;
    private _label: string;

    constructor(data: IUserStatus) {
        this._id = data.id;
        this._name = data.name;
        this._label = data.label;
    }

    get id(): string | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }
}