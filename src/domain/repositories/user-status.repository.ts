import {UserStatus} from "@domain/entities";

export abstract class UserStatusRepository {

    abstract findOneById(id: string): Promise<UserStatus | null>

    abstract findOneByName(name: string): Promise<UserStatus | null>

    abstract findAll(): Promise<UserStatus[]>

}