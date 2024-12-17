import {Prisma} from "@prisma/client";
import {IGetAllAffiliateParams} from "@interfaces/affiliate";

export const transformGetAllAffiliatesParams = (params: IGetAllAffiliateParams): Prisma.AffiliateWhereInput => {
    return params ? Object
        .entries(params)
        .reduce((where: any, [key, value]) => {
            switch (key) {
                case 'id' :
                    return value ? { ...where, id: value } : where;
                case 'name' :
                    return value ? { ...where, user: {name: value} } : where;
                case 'cpf' :
                    return value ? { ...where, user: { cpf: value } } : where;
                case 'phone' :
                    return value ? { ...where, user: { phone: value } } : where;
                case 'email' :
                    return value ? { ...where, user: { email: value } } : where;
                case 'uf' :
                    return value ? { ...where, user: { uf: value } } : where;
                case 'pixKey' :
                    return value ? { ...where, user: { pixKey: value } } : where;
                case 'code' :
                    return value ? { ...where, code: value } : where;
                case 'accountType' :
                    return value ? { ...where, user: { accountType: { name: value } } } : where;
                case 'status' :
                    return value ? { ...where, user: { status: { name: value } } } : where;
                case 'balance' :
                    return value ? {
                        ...where,
                        balance: Object.entries(value).reduce((amountWhere, [amountKey, amountValue]) => ({
                            ...amountWhere,
                            [amountKey]: amountValue
                        }), {})
                    } : where;
                case 'createdAt' :
                    return value ? {
                        ...where,
                        createdAt: Object.entries(value).reduce((dateWhere, [dateKey, dateValue]) => ({
                            ...dateWhere,
                            [dateKey]: new Date(dateValue as string)
                        }), {})
                    } : where;
                case 'updatedAt' :
                    return value ? {
                        ...where,
                        updatedAt: Object.entries(value).reduce((dateWhere, [dateKey, dateValue]) => ({
                            ...dateWhere,
                            [dateKey]: new Date(dateValue as string)
                        }), {})
                    } : where;
            }
        }, {}) : {}
}