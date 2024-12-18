import {
    Match as PrismaMatch,
    User as PrismaUser,
    MatchResult as PrismaMatchResult
} from "@prisma/client";
import { Match } from "@domain/entities";
import {Decimal} from "@prisma/client/runtime/library";
import {IMatch} from "@interfaces/match";

export interface MatchPrismaWithJoins extends PrismaMatch {
    user: PrismaUser;
    matchResult: PrismaMatchResult;
}

export class MatchMapper {
    static toDomain(data: MatchPrismaWithJoins): Match {
        return new Match({
            id: data.id,
            userId: data.userId,
            matchResultId: data.matchResultId,
            amount: data.amount.toNumber(),
            createdAt: data.createdAt,
            user: {
                ...data.user,
                balance: data.user.balance.toNumber()
            },
            matchResult: data.matchResult
        });
    }

    static toPrisma(domain: IMatch): Omit<PrismaMatch, "id"> {
        return {
            userId: domain.userId,
            matchResultId: domain.matchResultId,
            amount: new Decimal(domain.amount),
            createdAt: domain.createdAt,
        };
    }

    static toController(domain: IMatch) {
        return {
            id: domain.id,
            userId: domain.userId,
            matchResultId: domain.matchResultId,
            amount: domain.amount,
            createdAt: domain.createdAt,
            user: domain.user,
            matchResult: domain.matchResult,
        };
    }
}
