import {IUser} from "@interfaces/user";

export interface IMatchResult {
    id?: string
    name: string
    label: string
}

export interface IMatch {
    id?: string
    userId: string
    matchResultId: string
    amount: number
    createdAt: Date
    user?: IUser
    matchResult?: IMatchResult
}