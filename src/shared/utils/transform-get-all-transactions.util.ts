import {Prisma} from "@prisma/client";
import {IGetAllTransactionsParams} from "@interfaces/transaction";
import {transformGetAllUsersParams} from "@shared/utils/transform-get-all-users-params.util";

export const transformGetAllTransactionsParams = (params: IGetAllTransactionsParams): Prisma.TransactionWhereInput => {
    return params ? Object
        .entries(params)
        .reduce((where: any, [key, value]) => {
            switch (key) {
                case 'id' :
                    return value ? { ...where, id: value } : where;
                case 'type' :
                    return value ? { ...where, type: { name: value } } : where;
                case 'status' :
                    return value ? { ...where, status: { name: value} } : where;
                case 'pixKey' :
                    return value ? { ...where, pixKey: value } : where;
                case 'amount' :
                    return value ? {
                        ...where,
                        amount: Object.entries(value).reduce((amountWhere, [amountKey, amountValue]) => ({
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
                case 'user' :
                    return value ? { ...where, user: transformGetAllUsersParams(value) } : where;
            }
        }, {}) : {}
}