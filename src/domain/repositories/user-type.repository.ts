import {UserType} from "@domain/entities";

export abstract class UserTypeRepository {

    abstract findOneById(id: string): Promise<UserType | null>

    abstract findOneByName(name: string): Promise<UserType | null>

    abstract findAll(): Promise<UserType[]>

}