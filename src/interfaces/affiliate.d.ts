import {IUser} from "@interfaces/user";

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


export interface IAffiliateService {
    createAffiliate(dto: ICreateAffiliate): Promise<IAffiliate>
    getAllAffiliates(page?: number, limit?: number): Promise<{ affiliates: IAffiliate[], total: number, page: number | null }>
    getAffiliatePlayers(affiliateId: string, page?: number, limit?: number): Promise<{ users: IUser[], total: number, page: number | null }>
    updateAffiliate(id: string, dto: IAffiliate): Promise<IAffiliate>
    deleteAffiliate(id: string): Promise<void>
}