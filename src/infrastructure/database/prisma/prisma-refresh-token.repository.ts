import { RefreshTokenRepository } from "@domain/repositories";
import { RefreshToken } from "@domain/entities";
import { RefreshTokenMapper } from "@shared/mappers";
import { PrismaClient } from "@prisma/client";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: RefreshToken): Promise<RefreshToken> {
        return RefreshTokenMapper.toDomain(
            await this.prisma.refreshToken.create({
                data: RefreshTokenMapper.toPrisma(data),
                include: {
                    user: true
                }
            })
        )
    }

    async update(id: string, data: RefreshToken): Promise<RefreshToken> {
        return RefreshTokenMapper.toDomain(
            await this.prisma.refreshToken.update({
                where: {
                    id
                },
                data: RefreshTokenMapper.toPrisma(data),
                include: {
                    user: true
                }
            })
        )
    }

    async findOneByUserId(userId: string): Promise<RefreshToken | null> {
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                userId,
                revoked: false
            },
            include: {
               user: true
            }
        })

        if (!refreshToken) return null

        return RefreshTokenMapper.toDomain(refreshToken)
    }

    async findOneByToken(token: string): Promise<RefreshToken | null> {
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                token,
                revoked: false
            },
            include: {
                user: true
            }
        })

        if (!refreshToken) return null

        return RefreshTokenMapper.toDomain(refreshToken)
    }

}