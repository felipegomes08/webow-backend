import {AffiliateRepository} from "@domain/repositories";
import {PrismaClient} from "@prisma/client";
import {Affiliate, User} from "@domain/entities";
import {AffiliateMapper, UserMapper} from "@shared/mappers";

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

    async findAll(page?: number, limit?: number): Promise<Affiliate[]> {
        const affiliates = !page
            ? await this.prisma.affiliate.findMany({
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
                skip: (page - 1) * (limit ?? 25),
                take: limit ?? 25,
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

    async findAffiliatePlayers(affiliateId: string, page?: number, limit?: number): Promise<User[]> {
        const users = !page
            ? await this.prisma.user.findMany({
                where: {
                    affiliateId
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
                    affiliateId
                },
                skip: (page - 1) * (limit ?? 25),
                take: limit ?? 25,
                include: {
                    userType: true,
                    accountType: true,
                    status: true,
                    affiliate: true
                }
            });

        return users.map(UserMapper.toDomain);
    }

    async countAll(): Promise<number> {
        return await this.prisma.affiliate.count();
    }

    async countAllAffiliatePlayers(affiliateId: string): Promise<number> {
        return await this.prisma.user.count({
            where: {
                affiliateId
            }
        })
    }

}