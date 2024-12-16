import {TransactionStatusRepository} from "@domain/repositories";
import { PrismaClient } from "@prisma/client";
import {TransactionStatus} from "@domain/entities";
import {TransactionStatusMapper} from "@shared/mappers";

export class PrismaTransactionStatusRepository implements TransactionStatusRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findAll(): Promise<TransactionStatus[]> {
        const types = await this.prisma.transactionStatus.findMany()

        return types.map(TransactionStatusMapper.toDomain)
    }

    async findOneById(id: string): Promise<TransactionStatus | null> {
        const type = await this.prisma.transactionStatus.findFirst({
            where: {
                id
            }
        })

        if (!type) return null

        return TransactionStatusMapper.toDomain(type)
    }

}