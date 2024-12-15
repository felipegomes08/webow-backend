import {ITransactionType} from "@interfaces/transaction";

export class TransactionType implements ITransactionType {
    private _id?: string;
    private _name: string;
    private _label: string | null;

    constructor(data: ITransactionType) {
        this._name = data.name;
        this._label = data.label;
        this._id = data.id;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public set id(value: string | undefined) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get label(): string | null {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }
}