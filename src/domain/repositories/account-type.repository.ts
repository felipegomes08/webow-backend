import {AccountType} from "@domain/entities";

export abstract class AccountTypeRepository {

    abstract findOneById(id: string): Promise<AccountType | null>

    abstract findOneByName(name: string): Promise<AccountType | null>

    abstract findAll(): Promise<AccountType[]>

}