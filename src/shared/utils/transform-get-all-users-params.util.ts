import {IGetAllUsersParams} from "@interfaces/user";
import {Prisma} from "@prisma/client";

export const transformGetAllUsersParams = (params: IGetAllUsersParams): Prisma.UserWhereInput => {
    return params ? Object
        .entries(params)
        .reduce((where: any, [key, value]) => {
            switch (key) {
                case 'id' :
                    return value ? { ...where, id: value } : where;
                case 'name' :
                    return value ? { ...where, name: value } : where;
                case 'cpf' :
                    return value ? { ...where, cpf: value } : where;
                case 'phone' :
                    return value ? { ...where, phone: value } : where;
                case 'email' :
                    return value ? { ...where, email: value } : where;
                case 'uf' :
                    return value ? { ...where, uf: value } : where;
                case 'pixKey' :
                    return value ? { ...where, pixKey: value } : where;
                case 'affiliateCode' :
                    return value ? { ...where, affiliate: { code: value } } : where;
                case 'accountType' :
                    return value ? { ...where, accountType: { name: value } } : where;
                case 'userType' :
                    return value ? { ...where, userType: { name: value } } : where;
                case 'balance' :
                    return value ? {
                        ...where,
                        balance: Object.entries(value).reduce((amountWhere, [amountKey, amountValue]) => ({
                            ...amountWhere,
                            [amountKey]: amountValue
                        }), {})
                    } : where;
                case 'status' :
                    return value ? { ...where, status: { name: value } } : where;
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