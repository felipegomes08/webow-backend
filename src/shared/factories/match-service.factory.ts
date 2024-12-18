import { PrismaClient } from "@prisma/client";
import {IMatchService} from "@interfaces/match";
import {MatchService} from "../../application/services";
import {
    PrismaMatchRepository,
    PrismaMatchResultRepository,
    PrismaUserRepository
} from "@infrastructure/database/prisma";

export function matchServiceFactory(prisma: PrismaClient): IMatchService {
    return new MatchService(
        new PrismaMatchRepository(prisma),
        new PrismaMatchResultRepository(prisma),
        new PrismaUserRepository(prisma)
    );
}