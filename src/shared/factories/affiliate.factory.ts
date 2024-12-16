import {PrismaClient} from "@prisma/client";
import {AffiliateService} from "../../application/services";
import {
    PrismaAccountTypeRepository, PrismaRefreshTokenRepository,
    PrismaUserRepository,
    PrismaUserStatusRepository,
    PrismaUserTypeRepository
} from "@infrastructure/database/prisma";
import {IAffiliateService} from "@interfaces/affiliate";
import {PrismaAffiliateRepository} from "@infrastructure/database/prisma/prisma-affiliate.repository";

export function affiliateServiceFactory(prisma: PrismaClient): IAffiliateService {
    return new AffiliateService(
        new PrismaUserRepository(prisma),
        new PrismaUserTypeRepository(prisma),
        new PrismaUserStatusRepository(prisma),
        new PrismaAccountTypeRepository(prisma),
        new PrismaRefreshTokenRepository(prisma),
        new PrismaAffiliateRepository(prisma)
    )
}