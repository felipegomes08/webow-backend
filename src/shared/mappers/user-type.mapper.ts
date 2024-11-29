import {UserType as PrismaUserType} from "@prisma/client";
import {UserType} from "@domain/entities";
import { IUserType} from "@interfaces/user";

export class UserTypeMapper {

    static toDomain(data: PrismaUserType ): UserType {
        return new UserType({
            id: data.id,
            name: data.name,
            label: data.label
        })
    }

    static toPrisma(data: UserType ): Omit<PrismaUserType, 'id'> {
        return {
            name: data.name,
            label: data.label
        }
    }

    static toController(data: IUserType): IUserType {
        return {
            id: data.id,
            name: data.name,
            label: data.label
        }
    }

}