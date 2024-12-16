import {MatchResult} from "@domain/entities";

export abstract class MatchResultRepository {

    abstract findAll(): Promise<MatchResult[]>

    abstract findOneById(id: string): Promise<MatchResult | null>

}