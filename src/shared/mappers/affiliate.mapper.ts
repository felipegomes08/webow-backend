import { Affiliate as PrismaAffiliate, User as PrismaUser } from "@prisma/client";
import { Affiliate } from "@domain/entities";
import { Decimal } from "@prisma/client/runtime/library";

export interface AffiliatePrismaWithJoins extends PrismaAffiliate {
    user: PrismaUser;
}

export class AffiliateMapper {
    static toDomain(data: AffiliatePrismaWithJoins): Affiliate {
        return new Affiliate({
            id: data.id,
            code: data.code,
            userId: data.userId,
            link: data.link,
            balance: data.balance.toNumber(),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            active: data.active,
            user: {
                ...data.user,
                balance: data.user.balance.toNumber()
            }
        });
    }

    static toPrisma(domain: Affiliate): Omit<PrismaAffiliate, "id"> {
        return {
            code: domain.code,
            userId: domain.userId,
            link: domain.link,
            balance: new Decimal(domain.balance),
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
            active: domain.active,
        };
    }

    static toController(domain: Affiliate) {
        return {
            id: domain.id,
            code: domain.code,
            userId: domain.userId,
            link: domain.link,
            balance: domain.balance,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
            active: domain.active,
            user: domain.user,
        };
    }
}
