import {PrismaClient} from "@prisma/client";
import {PrismaConfigurationRepository } from "@infrastructure/database/prisma";
import {IConfigurationService} from "@interfaces/configuration";
import {ConfigurationService} from "../../application/services";

export function configurationServiceFactory(prisma: PrismaClient): IConfigurationService {
    return new ConfigurationService(
        new PrismaConfigurationRepository(prisma)
    )
}