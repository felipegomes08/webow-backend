import {PrismaClient} from "@prisma/client";
import {ITransactionService} from "@interfaces/transaction";
import {TransactionService} from "../../application/services/transaction.service";
import {PrismaTransactionRepository} from "@infrastructure/database/prisma/prisma-transaction.repository";
import {
    PrismaConfigurationRepository,
    PrismaTransactionStatusRepository,
    PrismaTransactionTypeRepository,
    PrismaUserRepository
} from "@infrastructure/database/prisma";

export function transactionServiceFactory(prisma: PrismaClient): ITransactionService {
    return new TransactionService(
        new PrismaTransactionRepository(prisma),
        new PrismaTransactionStatusRepository(prisma),
        new PrismaTransactionTypeRepository(prisma),
        new PrismaUserRepository(prisma),
        new PrismaConfigurationRepository(prisma)
    );
}