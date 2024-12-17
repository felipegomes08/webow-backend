import {TransactionStatus} from "@domain/entities";

export abstract class TransactionStatusRepository {

    abstract findAll(): Promise<TransactionStatus[]>

    abstract findOneById(id: string): Promise<TransactionStatus | null>

    abstract findByName(name: string): Promise<TransactionStatus | null>

}