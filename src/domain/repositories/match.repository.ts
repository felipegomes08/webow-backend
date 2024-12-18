import {IGetAllMatchParams, IMatch} from "@interfaces/match";

export abstract class MatchRepository {

    abstract create(data: IMatch): Promise<IMatch>

    abstract findAll(data: IGetAllMatchParams): Promise<IMatch[]>

    abstract count(data: IGetAllMatchParams): Promise<number>

    abstract findOneById(id: string): Promise<IMatch | null>

}