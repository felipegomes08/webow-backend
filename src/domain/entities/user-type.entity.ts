import {IUserType} from "@interfaces/user";

export class UserType implements IUserType {
    private _id?: string;
    private _name: string;
    private _label: string;

    constructor(data: IUserType) {
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