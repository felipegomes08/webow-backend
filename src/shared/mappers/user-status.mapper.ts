import {UserStatus as PrismaUserStatus} from "@prisma/client";
import {UserStatus} from "@domain/entities";
import {IUserStatus} from "@interfaces/user";

export class UserStatusMapper {

    static toDomain(data: PrismaUserStatus ): UserStatus {
        return new UserStatus({
            id: data.id,
            name: data.name,
            label: data.label
        })
    }

    static toPrisma(data: UserStatus ): Omit<PrismaUserStatus, 'id'> {
        return {
            name: data.name,
            label: data.label
        }
    }

    static toController(data: IUserStatus): IUserStatus {
        return {
            id: data.id,
            name: data.name,
            label: data.label
        }
    }

}