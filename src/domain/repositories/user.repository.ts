import {User} from "@domain/entities";
import {IGetAllUsersParams} from "@interfaces/user";

export abstract class UserRepository {

    abstract create(data: User): Promise<User>

    abstract update(id: string, data: User): Promise<User>

    abstract findOneByEmail(email: string): Promise<User | null>

    abstract findOneById(id: string): Promise<User | null>

    abstract findOneByCpf(cpf: string): Promise<User | null>

    abstract findAll(params: IGetAllUsersParams): Promise<User[]>

    abstract count(): Promise<number>
}