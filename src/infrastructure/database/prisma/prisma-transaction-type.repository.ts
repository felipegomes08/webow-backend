import {TransactionTypeRepository} from "@domain/repositories";
import { PrismaClient } from "@prisma/client";
import {TransactionType} from "@domain/entities";
import {TransactionTypeMapper} from "@shared/mappers";

export class PrismaTransactionTypeRepository implements TransactionTypeRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findAll(): Promise<TransactionType[]> {
        const types = await this.prisma.transactionType.findMany()

        return types.map(TransactionTypeMapper.toDomain)
    }

    async findOneById(id: string): Promise<TransactionType | null> {
        const type = await this.prisma.transactionType.findFirst({
            where: {
                id
            }
        })

        if (!type) return null

        return TransactionTypeMapper.toDomain(type)
    }

}