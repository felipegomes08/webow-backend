import {MatchRepository} from "@domain/repositories";
import { PrismaClient } from "@prisma/client";
import {IGetAllMatchParams, IMatch} from "@interfaces/match";
import {MatchMapper} from "@shared/mappers";
import {transformGetAllMatchParams} from "@shared/utils";

export class PrismaMatchRepository implements MatchRepository {

    constructor(private readonly prisma: PrismaClient)
    {}

    async create(data: IMatch): Promise<IMatch> {
        return MatchMapper.toDomain(
            await this.prisma.match.create({
                data: MatchMapper.toPrisma(data),
                include: {
                    matchResult: true,
                    user: true
                }
            })
        )
    }

    async findAll(params: IGetAllMatchParams): Promise<IMatch[]> {
        const matchParams = transformGetAllMatchParams(params)

        const matches = !params?.page
            ? await this.prisma.match.findMany({
                where: matchParams,
                include: {
                    matchResult: true,
                    user: true
                }
            })
            : await this.prisma.match.findMany({
                where: matchParams,
                skip: (params.page - 1) * (params?.limit ?? 25),
                take: params?.limit ?? 25,
                include: {
                    matchResult: true,
                    user: true
                }
            });

        return matches.map(MatchMapper.toDomain);
    }

    async count(params: IGetAllMatchParams): Promise<number> {
        const matchParams = transformGetAllMatchParams(params)

        return await this.prisma.match.count({
            where: matchParams
        })
    }

    async findOneById(id: string): Promise<IMatch | null> {
        const match = await this.prisma.match.findFirst({
            where: {
                id
            },
            include: {
                matchResult: true,
                user: true
            }
        })

        if (!match) return null;

        return MatchMapper.toDomain(match)
    }

}