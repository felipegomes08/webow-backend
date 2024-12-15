import {IAffiliate, IAffiliatePayment} from "@interfaces/affiliate";

export class AffiliatePayment implements IAffiliatePayment {
    private _id?: string;
    private _amount: number;
    private _affiliateId: string;
    private _createdAt: Date;
    private _affiliate?: IAffiliate;

    constructor(data: IAffiliatePayment) {
        this._id = data.id;
        this._amount = data.amount;
        this._affiliateId = data.affiliateId;
        this._createdAt = data.createdAt;
        this._affiliate = data.affiliate;
    }

    get id(): string | undefined {
        return this._id;
    }

    get amount(): number {
        return this._amount;
    }

    get affiliateId(): string {
        return this._affiliateId;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get affiliate(): IAffiliate | undefined {
        return this._affiliate;
    }
}
