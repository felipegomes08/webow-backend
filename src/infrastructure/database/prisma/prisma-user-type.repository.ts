import {UserTypeRepository} from "@domain/repositories";
import {UserType} from "@domain/entities";
import {PrismaClient} from '@prisma/client'
import {UserTypeMapper} from "@shared/mappers";

export class PrismaUserTypeRepository implements UserTypeRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findOneById(id: string): Promise<UserType | null> {
        const type = await this.prisma.userType.findUnique({
            where: {
                id
            }
        })

        if (!type) return null

        return UserTypeMapper.toDomain(type)
    }

    async findOneByName(name: string): Promise<UserType | null> {
        const type = await this.prisma.userType.findFirst({
            where: {
                name
            }
        })

        if (!type) return null

        return UserTypeMapper.toDomain(type)
    }

    async findAll(): Promise<UserType[]> {
        const types = await this.prisma.userType.findMany({});

        return types.map(UserTypeMapper.toDomain)
    }

}