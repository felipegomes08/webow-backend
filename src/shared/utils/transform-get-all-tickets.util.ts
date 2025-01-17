import {Prisma} from "@prisma/client";
import {IGetAllTicketsParams} from "@interfaces/ticket";

export const transformGetAllTicketsParams = (params: IGetAllTicketsParams): Prisma.TicketWhereInput => {
    return params ? Object
        .entries(params)
        .reduce((where: any, [key, value]) => {
            switch (key) {
                case 'id' :
                    return value ? { ...where, id: value } : where;
                case 'userId' :
                    return value ? { ...where, userId: value } : where;
                case 'supportId' :
                    return value ? { ...where, supportId: value } : where;
                case 'subject' :
                    return value ? { ...where, subject: value } : where;
                case 'deleted' :
                    return value ? { ...where, deleted: (['true', 'false'].includes(value) && value === 'true') } : where;
                case 'createdAt' :
                    return value ? {
                        ...where,
                        createdAt: Object.entries(value).reduce((dateWhere, [dateKey, dateValue]) => ({
                            ...dateWhere,
                            [dateKey]: new Date(dateValue as string)
                        }), {})
                    } : where;
                case 'closedAt' :
                    return value ? {
                        ...where,
                        closedAt: Object.entries(value).reduce((dateWhere, [dateKey, dateValue]) => ({
                            ...dateWhere,
                            [dateKey]: new Date(dateValue as string)
                        }), {})
                    } : where;
            }
        }, {}) : {}
}