import { PrismaClient } from '@prisma/client'
import {IMetadataService} from "@interfaces/metadata";
import {MetadataService} from "../../application/services";
import {
    PrismaAccountTypeRepository,
    PrismaMatchResultRepository, PrismaRouletteValueRepository,
    PrismaTransactionStatusRepository,
    PrismaTransactionTypeRepository,
    PrismaUserStatusRepository,
    PrismaUserTypeRepository
} from "@infrastructure/database/prisma";

export function metadataServiceFactory(prisma: PrismaClient): IMetadataService {
    return new MetadataService(
        new PrismaUserTypeRepository(prisma),
        new PrismaUserStatusRepository(prisma),
        new PrismaAccountTypeRepository(prisma),
        new PrismaTransactionTypeRepository(prisma),
        new PrismaTransactionStatusRepository(prisma),
        new PrismaMatchResultRepository(prisma),
        new PrismaRouletteValueRepository(prisma)
    )
}