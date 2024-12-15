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
