import {Affiliate, User} from "@domain/entities";
import {IGetAllAffiliateParams} from "@interfaces/affiliate";
import {IGetAllUsersParams} from "@interfaces/user";

export abstract class AffiliateRepository {

    abstract create(data: Affiliate): Promise<Affiliate>

    abstract update(id: string, data: Affiliate): Promise<Affiliate>

    abstract findAll(params: IGetAllAffiliateParams): Promise<Affiliate[]>

    abstract findOneById(id: string): Promise<Affiliate | null>;

    abstract findOneByCode(code: string): Promise<Affiliate | null>;

    abstract findAffiliatePlayers(affiliateId: string, params: IGetAllUsersParams): Promise<User[]>

    abstract countAll(): Promise<number>

    abstract countAllAffiliatePlayers(affiliateId: string): Promise<number>
}