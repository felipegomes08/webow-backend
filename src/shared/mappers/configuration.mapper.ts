import { Configuration as PrismaConfiguration } from "@prisma/client";
import { Configuration } from "@domain/entities";
import {IConfiguration} from "@interfaces/configuration";
import {ConfigurationPropertyConverter} from "@shared/utils";

export class ConfigurationMapper {
    static toDomain(data: PrismaConfiguration): Configuration {
        return new Configuration({
            id: data.id,
            pixel: data.pixel,
            interface: data.interface as object,
            system: data.system as object,
            active: data.active,
        });
    }

    static toPrisma(domain: Configuration): Omit<PrismaConfiguration, "id"> {
        return {
            pixel: domain.pixel,
            interface: domain.interface,
            system: domain.system,
            active: domain.active,
        };
    }

    static toController(domain: IConfiguration): IConfiguration {
        return {
            id: domain.id,
            pixel: domain.pixel,
            interface: {
                json: domain.interface,
                text: ConfigurationPropertyConverter.jsonToText(domain.interface)
            },
            system: {
                json: domain.system,
                text: ConfigurationPropertyConverter.jsonToText(domain.system)
            },
            active: domain.active,
        };
    }
}
