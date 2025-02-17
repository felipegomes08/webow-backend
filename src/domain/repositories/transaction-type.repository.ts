import {TransactionType} from "@domain/entities";

export abstract class TransactionTypeRepository {

    abstract findAll(): Promise<TransactionType[]>

    abstract findOneById(id: string): Promise<TransactionType | null>

    abstract findByName(name: string): Promise<TransactionType | null>
}