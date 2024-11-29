import {UserStatusRepository} from "@domain/repositories";
import {UserStatus} from "@domain/entities";
import {PrismaClient} from '@prisma/client'
import {UserStatusMapper} from "@shared/mappers";

export class PrismaUserStatusRepository implements UserStatusRepository {

    constructor(private readonly prisma: PrismaClient)
    {}

    async findOneById(id: string): Promise<UserStatus | null> {
        const type = await this.prisma.userStatus.findUnique({
            where: {
                id
            }
        })

        if (!type) return null

        return UserStatusMapper.toDomain(type)
    }

    async findOneByName(name: string): Promise<UserStatus | null> {
        const type = await this.prisma.userStatus.findFirst({
            where: {
                name
            }
        })

        if (!type) return null

        return UserStatusMapper.toDomain(type)
    }

    async findAll(): Promise<UserStatus[]> {
        const types = await this.prisma.userStatus.findMany({});

        return types.map(UserStatusMapper.toDomain)
    }

}