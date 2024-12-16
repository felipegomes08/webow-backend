import {Configuration} from "@domain/entities";

export abstract class ConfigurationRepository {

    abstract findUnique(): Promise<Configuration | null>;

    abstract findOneById(id: string): Promise<Configuration | null>;

    abstract updateOne(id: string, data: Configuration): Promise<Configuration>

}