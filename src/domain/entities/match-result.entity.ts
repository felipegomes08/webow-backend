import {IMatchResult} from "@interfaces/match";

export class MatchResult implements IMatchResult {
    private _id?: string;
    private _name: string;
    private _label: string;

    constructor(data: IMatchResult) {
        this._name = data.name;
        this._label = data.label;
        this._id = data.id;
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value.trim()) throw new Error("Name cannot be empty");
        this._name = value;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        if (!value.trim()) throw new Error("Label cannot be empty");
        this._label = value;
    }
}
