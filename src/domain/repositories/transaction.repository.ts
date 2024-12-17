import {IGetAllTransactionsParams, ITransaction} from "@interfaces/transaction";

export abstract class TransactionRepository {

    abstract create(data: ITransaction): Promise<ITransaction>

    abstract update(id: string, data: ITransaction): Promise<ITransaction>

    abstract findOneById(id: string): Promise<ITransaction | null>

    abstract findAll(params: IGetAllTransactionsParams): Promise<ITransaction[]>;

    abstract count(params: IGetAllTransactionsParams): Promise<number>

}