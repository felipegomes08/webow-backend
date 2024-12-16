import {RouletteValue} from "@domain/entities";

export abstract class RouletteValueRepository {

    abstract findAll(): Promise<RouletteValue[]>

    abstract findOneById(id: string): Promise<RouletteValue | null>

}