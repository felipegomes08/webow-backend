export interface IConfiguration {
    id?: string
    pixel: string
    interface: object
    system: object
    active: boolean
}

export interface IConfigurationService {

    updateConfiguration(id: string, configuration: IConfiguration): Promise<IConfiguration>

    getConfiguration(): Promise<IConfiguration | null>

}