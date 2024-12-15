import { TransactionType } from "@domain/entities";
import { ITransactionType } from "@interfaces/transaction";
import { TransactionType as PrismaTransactionType } from "@prisma/client";

export class TransactionTypeMapper {

    static toDomain(data: PrismaTransactionType): TransactionType {
        return new TransactionType({
            id: data.id,
            name: data.name,
            label: data.label,
        });
    }

    static toPrisma(data: TransactionType): Omit<PrismaTransactionType, "id"> {
        return {
            name: data.name,
            label: data.label,
        };
    }
    
    static toController(data: ITransactionType): ITransactionType {
        return {
            id: data.id,
            name: data.name,
            label: data.label,
        };
    }

}
