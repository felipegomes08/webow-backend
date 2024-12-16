import {ConfigurationRepository} from "@domain/repositories";
import {Configuration} from "@domain/entities";
import {ConfigurationMapper} from "@shared/mappers";
import {PrismaClient} from "@prisma/client";

export class PrismaConfigurationRepository implements ConfigurationRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async findUnique(): Promise<Configuration | null> {
        const config = await this.prisma.configuration.findFirst()

        if (!config) return null

        return ConfigurationMapper.toDomain(config)
    }

    async findOneById(id: string): Promise<Configuration | null> {
        const config = await this.prisma.configuration.findFirst({
            where: {
                id
            }
        })

        if (!config) return null

        return ConfigurationMapper.toDomain(config)
    }

    async updateOne(id: string, data: Configuration): Promise<Configuration> {
        return ConfigurationMapper.toDomain(
            await this.prisma.configuration.update({
                where: {
                    id
                },
                data: ConfigurationMapper.toPrisma(data) as any
            })
        )
    }
}