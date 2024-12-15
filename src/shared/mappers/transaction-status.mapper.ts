import { TransactionStatus } from "@domain/entities";
import { ITransactionStatus } from "@interfaces/transaction";
import { TransactionStatus as PrismaTransactionStatus } from "@prisma/client";

export class TransactionStatusMapper {

    static toDomain(data: PrismaTransactionStatus): TransactionStatus {
        return new TransactionStatus({
            id: data.id,
            name: data.name,
            label: data.label,
        });
    }

    static toPrisma(data: TransactionStatus): Omit<PrismaTransactionStatus, "id"> {
        return {
            name: data.name,
            label: data.label!,
        };
    }

    static toController(data: ITransactionStatus): ITransactionStatus {
        return {
            id: data.id,
            name: data.name,
            label: data.label,
        };
    }

}
