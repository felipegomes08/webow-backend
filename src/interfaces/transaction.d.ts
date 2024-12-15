import {IUser} from "@interfaces/user";

export interface ITransactionType {
    id?: string
    name: string
    label: string | null
}

export interface ITransactionStatus {
    id?: string
    name: string
    label: string | null
}

export interface ITransaction {
    id?: string
    userId: string
    typeId: string
    statusId: string
    pixKey: string
    createdAt: Date
    updatedAt: Date
    amount: number
    user?: IUser
    type?: ITransactionType
    status?: ITransactionStatus
}