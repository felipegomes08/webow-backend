import { IMatchResult } from "@interfaces/match";
import {IRouletteValue} from "@interfaces/roulette-value";

export class RouletteValue implements IRouletteValue {
    private _id?: string;
    private _matchResultId: string;
    private _label: string;
    private _value: number;
    private _matchResult?: IMatchResult;

    constructor(data: IRouletteValue) {
        this._id = data.id;
        this._matchResultId = data.matchResultId;
        this._label = data.label;
        this._value = data.value;
        this._matchResult = data.matchResult;
    }

    get id(): string | undefined {
        return this._id;
    }

    get matchResultId(): string {
        return this._matchResultId;
    }

    get label(): string {
        return this._label;
    }

    get value(): number {
        return this._value;
    }

    get matchResult(): IMatchResult | undefined {
        return this._matchResult;
    }
}
