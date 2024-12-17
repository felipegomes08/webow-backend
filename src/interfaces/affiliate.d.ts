import {IGetAllUsersParams, IRangeParam, IUser} from "@interfaces/user";

export interface IAffiliate {
    id?: string
    code: string
    userId: string
    link: string
    balance: number
    createdAt: Date
    updatedAt: Date
    active: boolean
    user?: IUser
}

export interface IAffiliatePayment {
    id?: string
    amount: number
    affiliateId: string
    createdAt: Date
    affiliate?: IAffiliate
}

export interface IAffiliateEarning {
    id?: string
    amount: number
    percentage: number
    action: string
    createdAt: Date
    affiliateId: string
    affiliate?: IAffiliate
}

export interface ICreateAffiliate {
    name?: string
    cpf: string
    phone: string
    email?: string
    pixKey?: string
    password: string
    code: string
    link?: string
}

export interface IGetAllAffiliateParams {
    name?: string
    cpf?: string
    phone?: string
    email?: string
    pixKey?: string
    code?: string
    link?: string
    balance?: IRangeParam<number>
    createdAt?: IRangeParam<Date>
    updatedAt?: IRangeParam<Date>
    active?: boolean
    page?: number
    limit?: number
}

export interface IAffiliateService {
    createAffiliate(dto: ICreateAffiliate): Promise<IAffiliate>

    getAllAffiliates(params: IGetAllAffiliateParams): Promise<{ affiliates: IAffiliate[], total: number, page: number | null }>

    getAffiliatePlayers(affiliateId: string, params: IGetAllUsersParams): Promise<{ users: IUser[], total: number, page: number | null }>

    updateAffiliate(id: string, dto: IAffiliate): Promise<IAffiliate>

    deleteAffiliate(id: string): Promise<void>
}