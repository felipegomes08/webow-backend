import {IMatchResult} from "@interfaces/match";

export interface IRouletteValue {
    id?: string
    matchResultId: string
    label: string
    value: number
    matchResult?: IMatchResult
}