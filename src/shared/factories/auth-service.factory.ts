import {PrismaClient} from "@prisma/client";
import {
    PrismaRefreshTokenRepository,
    PrismaUserRepository
} from "@infrastructure/database/prisma";
import {AuthService} from "../../application/services/auth.service";
import {IAuthService} from "@interfaces/auth";

export function authServiceFactory(prisma: PrismaClient): IAuthService {
    return new AuthService(
        new PrismaRefreshTokenRepository(prisma),
        new PrismaUserRepository(prisma)
    )
}