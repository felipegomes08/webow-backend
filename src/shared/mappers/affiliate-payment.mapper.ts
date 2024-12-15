import { AffiliatePayment as PrismaAffiliatePayment, Affiliate as PrismaAffiliate } from "@prisma/client";
import { AffiliatePayment } from "@domain/entities";
import { Decimal } from "@prisma/client/runtime/library";

export interface AffiliatePaymentPrismaWithJoins extends PrismaAffiliatePayment {
    affiliate: PrismaAffiliate;
}

export class AffiliatePaymentMapper {
    static toDomain(data: AffiliatePaymentPrismaWithJoins): AffiliatePayment {
        return new AffiliatePayment({
            id: data.id,
            amount: data.amount.toNumber(),
            affiliateId: data.affiliateId,
            createdAt: data.createdAt,
            affiliate: {
                ...data.affiliate,
                balance: data.affiliate.balance.toNumber()
            }
        });
    }

    static toPrisma(domain: AffiliatePayment): Omit<PrismaAffiliatePayment, "id"> {
        return {
            amount: new Decimal(domain.amount),
            affiliateId: domain.affiliateId,
            createdAt: domain.createdAt,
        };
    }

    static toController(domain: AffiliatePayment) {
        return {
            id: domain.id,
            amount: domain.amount,
            affiliateId: domain.affiliateId,
            createdAt: domain.createdAt,
            affiliate: domain.affiliate,
        };
    }
}
