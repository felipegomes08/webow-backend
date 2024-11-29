import {AccountType as PrismaAccountType} from "@prisma/client";
import {AccountType} from "@domain/entities";
import {IAccountType} from "@interfaces/user";

export class AccountTypeMapper {

    static toDomain(data: PrismaAccountType ): AccountType {
        return new AccountType({
            id: data.id,
            name: data.name,
            label: data.label
        })
    }

    static toPrisma(data: AccountType ): Omit<PrismaAccountType, 'id'> {
        return {
            name: data.name,
            label: data.label
        }
    }

    static toController(data: IAccountType): IAccountType {
        return {
            id: data.id,
            name: data.name,
            label: data.label
        }
    }

}