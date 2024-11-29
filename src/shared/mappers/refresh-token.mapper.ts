import { RefreshToken } from "@domain/entities";
import { User as PrismaUser, RefreshToken as PrismaRefreshToken } from '@prisma/client'

export interface PrismaRefreshTokenWithJoin extends PrismaRefreshToken {
    user?: PrismaUser | null,
}

export class RefreshTokenMapper {

    static toDomain(data: PrismaRefreshTokenWithJoin): RefreshToken {
        return new RefreshToken({
            id: data.id,
            token: data.token,
            userId: data.userId,
            user: data.user,
            expiresAt: data.expiresAt,
            revoked: data.revoked,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        })
    }

    static toPrisma(data: RefreshToken): Omit<PrismaRefreshToken, 'id' | 'createdAt' | 'updatedAt'> {
        return {
            token: data.token,
            userId: data.userId,
            expiresAt: data.expiresAt,
            revoked: data.revoked,
        }
    }

}