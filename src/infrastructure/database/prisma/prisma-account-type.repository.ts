import {AccountTypeRepository} from "@domain/repositories";
import {AccountType} from "@domain/entities";
import {PrismaClient} from '@prisma/client'
import {AccountTypeMapper} from "@shared/mappers";

export class PrismaAccountTypeRepository implements AccountTypeRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findOneById(id: string): Promise<AccountType | null> {
        const type = await this.prisma.accountType.findUnique({
            where: {
                id
            }
        })

        if (!type) return null

        return AccountTypeMapper.toDomain(type)
    }

    async findOneByName(name: string): Promise<AccountType | null> {
        const type = await this.prisma.accountType.findFirst({
            where: {
                name
            }
        })

        if (!type) return null

        return AccountTypeMapper.toDomain(type)
    }

    async findAll(): Promise<AccountType[]> {
        const types = await this.prisma.accountType.findMany({});

        return types.map(AccountTypeMapper.toDomain)
    }

}