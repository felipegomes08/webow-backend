import {UserRepository} from "@domain/repositories";
import {User} from "@domain/entities";
import {UserMapper} from "@shared/mappers";
import {PrismaClient} from "@prisma/client";
import {IGetAllUsersParams} from "@interfaces/user";
import {transformGetAllUsersParams} from "@shared/utils";

export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: User): Promise<User> {
        return UserMapper.toDomain(
            await this.prisma.user.create({
                data: UserMapper.toPrisma(data),
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
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
                    status: true,
                    affiliate: true
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
                status: true,
                affiliate: true
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
                status: true,
                affiliate: true
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
                status: true,
                affiliate: true
            }
        })

        if (!user) return null

        return UserMapper.toDomain(user)
    }

    async findAll(params: IGetAllUsersParams): Promise<User[]> {
        const matchParams = transformGetAllUsersParams(params)

        const users = !params?.page
            ? await this.prisma.user.findMany({
                where: matchParams,
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
                }
            })
            : await this.prisma.user.findMany({
                where: matchParams,
                skip: (params.page - 1) * (params?.limit ?? 25),
                take: params?.limit ?? 25,
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
                }
            });

        return users.map(UserMapper.toDomain);
    }

    async count(params: IGetAllUsersParams): Promise<number> {
        return await this.prisma.user.count({
            where: transformGetAllUsersParams(params)
        });
    }

}