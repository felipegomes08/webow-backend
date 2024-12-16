import {PrismaClient} from "@prisma/client";
import {UserService} from "../../application/services";
import {
    PrismaAccountTypeRepository, PrismaAffiliateRepository, PrismaConfigurationRepository, PrismaRefreshTokenRepository,
    PrismaUserRepository,
    PrismaUserStatusRepository,
    PrismaUserTypeRepository
} from "@infrastructure/database/prisma";
import {IUserService} from "@interfaces/user";

export function userServiceFactory(prisma: PrismaClient): IUserService {
    return new UserService(
        new PrismaUserRepository(prisma),
        new PrismaUserTypeRepository(prisma),
        new PrismaUserStatusRepository(prisma),
        new PrismaAccountTypeRepository(prisma),
        new PrismaRefreshTokenRepository(prisma),
        new PrismaAffiliateRepository(prisma),
        new PrismaConfigurationRepository(prisma)
    )
}