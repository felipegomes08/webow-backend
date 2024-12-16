import {RouletteValueRepository} from "@domain/repositories";
import { PrismaClient } from "@prisma/client";
import {RouletteValue} from "@domain/entities";
import {RouletteValueMapper} from "@shared/mappers";

export class PrismaRouletteValueRepository implements RouletteValueRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async findAll(): Promise<RouletteValue[]> {
        const types = await this.prisma.rouletteValue.findMany({
            include: {
                matchResult: true
            }
        })

        return types.map(RouletteValueMapper.toDomain)
    }

    async findOneById(id: string): Promise<RouletteValue | null> {
        const type = await this.prisma.rouletteValue.findFirst({
            where: {
                id
            },
            include: {
                matchResult: true
            }
        })

        if (!type) return null

        return RouletteValueMapper.toDomain(type)
    }

}