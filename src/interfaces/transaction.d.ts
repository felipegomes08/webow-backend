import {IGetAllUsersParams, IRangeParam, IUser} from "@interfaces/user";

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

export interface ICreateTransaction {
    userId: string
    amount: number
}

export interface IGetAllTransactionsParams {
    id?: string
    type?: string
    status?: string
    pixKey?: string
    createdAt?: IRangeParam<Date>
    updatedAt?: IRangeParam<Date>
    amount: IRangeParam<number>
    user?: IGetAllUsersParams
    page?: number
    limit?: number
}

export interface IGetAllTransactionsResponse {
    transactions: ITransaction[]
    page: number | null
    total: number
}

export interface ITransactionService {

    createTransaction(type: string, dto: ICreateTransaction): Promise<ITransaction>

    updateTransaction(id: string, transaction: ITransaction): Promise<ITransaction>

    getTransactionById(id: string): Promise<ITransaction | null>

    getAll(params: IGetAllTransactionsParams): Promise<IGetAllTransactionsResponse>

}