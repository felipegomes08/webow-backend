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
            },
            include: {
                userType: true,
                accountType: true,
                status: true
            }
        })

        if (!user) return null;

        return UserMapper.toDomain(user)
    }

    async findOneByCpf(cpf: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                cpf
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

    async findAll(page?: number, limit?: number): Promise<User[]> {
        const users = !page
            ? await this.prisma.user.findMany({
                include: {
                    userType: true,
                    accountType: true,
                    status: true
                }
            })
            : await this.prisma.user.findMany({
                skip: (page - 1) * (limit ?? 25),
                take: limit ?? 25,
                include: {
                    userType: true,
                    accountType: true,
                    status: true
                }
            });

        return users.map(UserMapper.toDomain);
    }

    async count(): Promise<number> {
        return await this.prisma.user.count();
    }

}