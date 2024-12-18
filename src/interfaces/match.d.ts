import {IGetAllUsersParams, IRangeParam, IUser} from "@interfaces/user";

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

export interface IGetAllMatchParams {
    id?: string
    amount?: IRangeParam<number>
    createdAt?: IRangeParam<Date>
    matchResult?: string
    user?: IGetAllUsersParams
    page?: number
    limit?: number
}

export interface IGetAllMatchResponse {
    matches: IMatch[]
    page: number | null
    total: number
}

export interface IMatchCreateDto {
    userId: string
    matchResultId: string
    amount: number
}

export interface IMatchService {

    create(dto: IMatch): Promise<IMatch>

    findAll(params: IGetAllMatchParams): Promise<IGetAllMatchResponse>

    findOneById(id: string): Promise<IMatch | null>

}