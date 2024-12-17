import { PrismaClient } from '@prisma/client'
import {TransactionRepository} from "@domain/repositories";
import {IGetAllTransactionsParams, ITransaction} from "@interfaces/transaction";
import {TransactionMapper} from "@shared/mappers/transaction.mapper";
import {transformGetAllTransactionsParams} from "@shared/utils";

export class PrismaTransactionRepository implements TransactionRepository {

    constructor(private readonly prisma: PrismaClient)
    {}

    async create(data: ITransaction): Promise<ITransaction> {
        return TransactionMapper.toDomain(
            await this.prisma.transaction.create({
                data: TransactionMapper.toPrisma(data),
                include: {
                    user: true,
                    type: true,
                    status: true
                }
            })
        )
    }

    async update(id: string, data: ITransaction): Promise<ITransaction> {
        return TransactionMapper.toDomain(
            await this.prisma.transaction.update({
                where: {
                    id
                },
                data: TransactionMapper.toPrisma(data),
                include: {
                    user: true,
                    type: true,
                    status: true
                }
            })
        )
    }

    async findOneById(id: string): Promise<ITransaction | null> {
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id
            },
            include: {
                user: true,
                type: true,
                status: true
            }
        })

        if (!transaction) return null;

        return TransactionMapper.toDomain(transaction)
    }

    async count(params: IGetAllTransactionsParams): Promise<number> {
        const matchParams = transformGetAllTransactionsParams(params)

        return await this.prisma.transaction.count({
            where: matchParams
        })
    }

    async findAll(params: IGetAllTransactionsParams): Promise<ITransaction[]> {
        const matchParams = transformGetAllTransactionsParams(params)

        const transactions = !params?.page
            ? await this.prisma.transaction.findMany({
                where: matchParams,
                include: {
                    user: true,
                    type: true,
                    status: true
                }
            })
            : await this.prisma.transaction.findMany({
                where: matchParams,
                skip: (params.page - 1) * (params?.limit ?? 25),
                take: params?.limit ?? 25,
                include: {
                    user: true,
                    type: true,
                    status: true
                }
            });

        return transactions.map(TransactionMapper.toDomain);
    }

}