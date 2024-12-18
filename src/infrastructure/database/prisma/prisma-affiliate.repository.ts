import {AffiliateRepository} from "@domain/repositories";
import {PrismaClient} from "@prisma/client";
import {Affiliate, User} from "@domain/entities";
import {AffiliateMapper, UserMapper} from "@shared/mappers";
import {IGetAllAffiliateParams} from "@interfaces/affiliate";
import {transformGetAllAffiliatesParams, transformGetAllUsersParams} from "@shared/utils";
import {IGetAllUsersParams} from "@interfaces/user";

export class PrismaAffiliateRepository implements AffiliateRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(data: Affiliate): Promise<Affiliate> {
        return AffiliateMapper.toDomain(
            await this.prisma.affiliate.create({
                data: AffiliateMapper.toPrisma(data),
                include: {
                    user: {
                        include: {
                            userType: true,
                            accountType: true,
                            status: true
                        }
                    }
                }
            })
        )
    }

    async update(id: string, data: Affiliate): Promise<Affiliate> {
        return AffiliateMapper.toDomain(
            await this.prisma.affiliate.update({
                where: {
                    id
                },
                data: AffiliateMapper.toPrisma(data),
                include: {
                    user: {
                        include: {
                            userType: true,
                            accountType: true,
                            status: true
                        }
                    }
                }
            })
        )
    }

    async findOneById(id: string): Promise<Affiliate | null> {
        const affiliate = await this.prisma.affiliate.findFirst({
            where: {
                id
            },
            include: {
                user: {
                    include: {
                        userType: true,
                        accountType: true,
                        status: true
                    }
                }
            }
        })

        if(!affiliate) return null

        return AffiliateMapper.toDomain(affiliate)
    }

    async findOneByCode(code: string): Promise<Affiliate | null> {
        const affiliate = await this.prisma.affiliate.findFirst({
            where: {
                code
            },
            include: {
                user: {
                    include: {
                        userType: true,
                        accountType: true,
                        status: true
                    }
                }
            }
        })

        if(!affiliate) return null

        return AffiliateMapper.toDomain(affiliate)
    }

    async findAll(params: IGetAllAffiliateParams): Promise<Affiliate[]> {
        const matchParams = transformGetAllAffiliatesParams(params)

        const affiliates = !params.page
            ? await this.prisma.affiliate.findMany({
                where: matchParams,
                include: {
                    user: {
                        include: {
                            userType: true,
                            accountType: true,
                            status: true
                        }
                    }
                }
            })
            : await this.prisma.affiliate.findMany({
                where: matchParams,
                skip: (params.page - 1) * (params.limit ?? 25),
                take: params.limit ?? 25,
                include: {
                    user: {
                        include: {
                            userType: true,
                            accountType: true,
                            status: true
                        }
                    }
                }
            });

        return affiliates.map(AffiliateMapper.toDomain);
    }

    async findAffiliatePlayers(affiliateId: string, params: IGetAllUsersParams): Promise<User[]> {
        const matchParams = transformGetAllUsersParams(params)

        const users = !params.page
            ? await this.prisma.user.findMany({
                where: {
                    affiliateId,
                    ...matchParams
                },
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
                }
            })
            : await this.prisma.user.findMany({
                where: {
                    affiliateId,
                    ...matchParams
                },
                skip: (params.page - 1) * (params.limit ?? 25),
                take: params.limit ?? 25,
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
                }
            });

        return users.map(UserMapper.toDomain);
    }

    async countAll(params: IGetAllAffiliateParams): Promise<number> {
        return await this.prisma.affiliate.count({
            where: transformGetAllAffiliatesParams(params)
        });
    }

    async countAllAffiliatePlayers(affiliateId: string, params: IGetAllUsersParams): Promise<number> {
        return await this.prisma.user.count({
            where: {
                affiliateId,
                ...transformGetAllUsersParams(params)
            }
        })
    }

}