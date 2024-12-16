import {IConfiguration, IConfigurationService} from "@interfaces/configuration";
import {ConfigurationRepository} from "@domain/repositories";

export class ConfigurationService implements IConfigurationService {

    constructor(private readonly configurationRepository: ConfigurationRepository)
    {}

    async getConfiguration(): Promise<IConfiguration | null> {
        return await this.configurationRepository.findUnique()
    }

    async updateConfiguration(id: string, data: IConfiguration): Promise<IConfiguration> {
        const configuration = await this.configurationRepository.findOneById(id)

        if (!configuration) {
            throw new Error('Not found configuration')
        }

        Object.assign(configuration, data)

        return await this.configurationRepository.updateOne(id, configuration)
    }

}