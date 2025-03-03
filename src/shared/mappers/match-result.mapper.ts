import {MatchResult as PrismaMatchResult} from "@prisma/client";
import {MatchResult} from "@domain/entities";
import {IMatchResult} from "@interfaces/match";

export class MatchResultMapper {
    static toDomain(data: PrismaMatchResult): MatchResult {
        return new MatchResult({
            id: data.id,
            name: data.name,
            label: data.label,
        });
    }

    static toPrisma(domain: MatchResult): Omit<PrismaMatchResult, "id"> {
        return {
            name: domain.name,
            label: domain.label,
        };
    }

    static toController(data: IMatchResult) {
        return {
            id: data.id,
            name: data.name,
            label: data.label,
        };
    }
}
