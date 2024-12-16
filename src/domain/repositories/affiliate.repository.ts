import {Affiliate, User} from "@domain/entities";

export abstract class AffiliateRepository {

    abstract create(data: Affiliate): Promise<Affiliate>

    abstract update(id: string, data: Affiliate): Promise<Affiliate>

    abstract findAll(page?: number, limit?: number): Promise<Affiliate[]>

    abstract findOneById(id: string): Promise<Affiliate | null>;

    abstract findAffiliatePlayers(affiliateId: string, page?: number, limit?: number): Promise<User[]>

    abstract countAll(): Promise<number>

    abstract countAllAffiliatePlayers(affiliateId: string): Promise<number>
}