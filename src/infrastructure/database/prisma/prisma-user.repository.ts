import {UserRepository} from "@domain/repositories";
import {User} from "@domain/entities";
import {UserMapper} from "@shared/mappers";
import {PrismaClient} from "@prisma/client";

export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: User): Promise<User> {
        return UserMapper.toDomain(
            await this.prisma.user.create({
                data: UserMapper.toPrisma(data),
                include: {
                    userType: true,
                    accountType: true,
                    status: true
                }
            })
        )
    }

    async update(id: string, data: User): Promise<User> {
        return UserMapper.toDomain(
            await this.prisma.user.update({
                where: {
                    id
                },
                data: UserMapper.toPrisma(data),
                include: {
                    userType: true,
                    accountType: true,
                    status: true
                }
            })
        )
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            },
            include: {
                userType: true,
                accountType: true,
                status: true
            }
        })

        if (!user) return null

        return UserMapper.toDomain(user)
    }

    async findOneById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return null;

        return UserMapper.toDomain(user)
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({});

        return users.map(UserMapper.toDomain);
    }

}