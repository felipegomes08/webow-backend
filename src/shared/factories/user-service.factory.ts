import {PrismaClient} from "@prisma/client";
import {UserService} from "../../application/services";
import {
    PrismaAccountTypeRepository, PrismaRefreshTokenRepository,
    PrismaUserRepository,
    PrismaUserStatusRepository,
    PrismaUserTypeRepository
} from "@infrastructure/database/prisma";
import {IAffiliateService} from "@interfaces/user";

export function userServiceFactory(prisma: PrismaClient): IAffiliateService {
    return new UserService(
        new PrismaUserRepository(prisma),
        new PrismaUserTypeRepository(prisma),
        new PrismaUserStatusRepository(prisma),
        new PrismaAccountTypeRepository(prisma),
        new PrismaRefreshTokenRepository(prisma)
    )
}