import { AffiliateEarning as PrismaAffiliateEarning, Affiliate as PrismaAffiliate } from "@prisma/client";
import { AffiliateEarning } from "@domain/entities";
import { Decimal } from "@prisma/client/runtime/library";

export interface AffiliateEarningPrismaWithJoins extends PrismaAffiliateEarning {
    affiliate: PrismaAffiliate;
}

export class AffiliateEarningMapper {
    static toDomain(data: AffiliateEarningPrismaWithJoins): AffiliateEarning {
        return new AffiliateEarning({
            id: data.id,
            amount: data.amount.toNumber(),
            percentage: data.percentage.toNumber(),
            action: data.action,
            createdAt: data.createdAt,
            affiliateId: data.affiliateId,
            affiliate: {
                ...data.affiliate,
                balance: data.affiliate.balance.toNumber()
            }
        });
    }

    static toPrisma(domain: AffiliateEarning): Omit<PrismaAffiliateEarning, "id"> {
        return {
            amount: new Decimal(domain.amount),
            percentage: new Decimal(domain.percentage),
            action: domain.action,
            createdAt: domain.createdAt,
            affiliateId: domain.affiliateId,
        };
    }

    static toController(domain: AffiliateEarning) {
        return {
            id: domain.id,
            amount: domain.amount,
            percentage: domain.percentage,
            action: domain.action,
            createdAt: domain.createdAt,
            affiliateId: domain.affiliateId,
            affiliate: domain.affiliate,
        };
    }
}
