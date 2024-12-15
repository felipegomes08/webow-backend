import {IAffiliate, IAffiliateEarning} from "@interfaces/affiliate";

export class AffiliateEarning implements IAffiliateEarning {
    private _id?: string;
    private _amount: number;
    private _percentage: number;
    private _action: string;
    private _createdAt: Date;
    private _affiliateId: string;
    private _affiliate?: IAffiliate;

    constructor(data: IAffiliateEarning) {
        this._id = data.id;
        this._amount = data.amount;
        this._percentage = data.percentage;
        this._action = data.action;
        this._createdAt = data.createdAt;
        this._affiliateId = data.affiliateId;
        this._affiliate = data.affiliate;
    }

    get id(): string | undefined {
        return this._id;
    }

    get amount(): number {
        return this._amount;
    }

    get percentage(): number {
        return this._percentage;
    }

    get action(): string {
        return this._action;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get affiliateId(): string {
        return this._affiliateId;
    }

    get affiliate(): IAffiliate | undefined {
        return this._affiliate;
    }
}
