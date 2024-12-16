import {MatchResultRepository} from "@domain/repositories";
import { PrismaClient } from "@prisma/client";
import {MatchResult} from "@domain/entities";
import {MatchResultMapper} from "@shared/mappers";

export class PrismaMatchResultRepository implements MatchResultRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findAll(): Promise<MatchResult[]> {
        const types = await this.prisma.matchResult.findMany()

        return types.map(MatchResultMapper.toDomain)
    }

    async findOneById(id: string): Promise<MatchResult | null> {
        const type = await this.prisma.matchResult.findFirst({
            where: {
                id
            }
        })

        if (!type) return null

        return MatchResultMapper.toDomain(type)
    }

}