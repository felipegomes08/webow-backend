import {
    RouletteValue as PrismaRouletteValue,
    MatchResult as PrismaMatchResult
} from "@prisma/client";
import { RouletteValue } from "@domain/entities";
import { Decimal } from "@prisma/client/runtime/library";
import {IRouletteValue} from "@interfaces/roulette-value";

export interface RouletteValuePrismaWithJoins extends PrismaRouletteValue {
    matchResult?: PrismaMatchResult;
}

export class RouletteValueMapper {
    static toDomain(data: RouletteValuePrismaWithJoins): RouletteValue {
        return new RouletteValue({
            id: data.id,
            matchResultId: data.matchResultId,
            matchResult: data.matchResult,
            label: data.label,
            value: data.value.toNumber()
        });
    }

    static toPrisma(domain: RouletteValue): Omit<PrismaRouletteValue, "id"> {
        return {
            matchResultId: domain.matchResultId,
            label: domain.label,
            value: new Decimal(domain.value),
        };
    }

    static toController(domain: IRouletteValue) {
        return {
            id: domain.id,
            matchResultId: domain.matchResultId,
            matchResult: domain.matchResult,
            label: domain.label,
            value: domain.value,
        };
    }
}
