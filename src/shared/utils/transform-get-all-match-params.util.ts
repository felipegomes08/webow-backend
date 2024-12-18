import {Prisma} from "@prisma/client";
import {transformGetAllUsersParams} from "@shared/utils/transform-get-all-users-params.util";
import {IGetAllMatchParams} from "@interfaces/match";

export const transformGetAllMatchParams = (params: IGetAllMatchParams): Prisma.MatchWhereInput => {
    return params ? Object
        .entries(params)
        .reduce((where: any, [key, value]) => {
            switch (key) {
                case 'id' :
                    return value ? { ...where, id: value } : where;
                case 'matchResult' :
                    return value ? { ...where, matchResult: { name: value } } : where;
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
                case 'user' :
                    return value ? { ...where, user: transformGetAllUsersParams(value) } : where;
            }
        }, {}) : {}
}