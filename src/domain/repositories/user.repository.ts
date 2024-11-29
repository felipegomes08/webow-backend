import {User} from "@domain/entities";

export abstract class UserRepository {

    abstract create(data: User): Promise<User>

    abstract update(id: string, data: User): Promise<User>

    abstract findOneByEmail(email: string): Promise<User | null>

    abstract findAll(): Promise<User[]>

}