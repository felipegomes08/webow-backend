import { Transaction } from "@domain/entities";
import {
    Transaction as PrismaTransaction,
    User as PrismaUser,
    TransactionType as PrismaTransactionType,
    TransactionStatus as PrismaTransactionStatus
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import {ITransaction} from "@interfaces/transaction";

export interface TransactionPrismaWithJoins extends PrismaTransaction {
    type: PrismaTransactionType
    user: PrismaUser
    status: PrismaTransactionStatus
}
export class TransactionMapper {

    static toDomain(data: TransactionPrismaWithJoins): Transaction {
        return new Transaction({
            id: data.id,
            userId: data.userId,
            user:  {
                ...data.user,
                balance: data.user.balance.toNumber()
            },
            typeId: data.typeId,
            type: data.type,
            statusId: data.statusId,
            status: data.status,
            pixKey: data.pixKey,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            amount: data.amount.toNumber(),
        });
    }

    static toPrisma(data: ITransaction): Omit<PrismaTransaction, "id"> {
        return {
            userId: data.userId,
            typeId: data.typeId,
            statusId: data.statusId,
            pixKey: data.pixKey,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            amount: new Decimal(data.amount),
        };
    }

    static toController(data: ITransaction): ITransaction {
        return {
            id: data.id,
            userId: data.userId,
            user: data.user,
            typeId: data.typeId,
            type: data.type,
            statusId: data.statusId,
            status: data.status,
            pixKey: data.pixKey,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            amount: data.amount,
        }
    }

}
