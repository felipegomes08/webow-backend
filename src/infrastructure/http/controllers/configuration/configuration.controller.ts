import {BaseController} from "@infrastructure/http/controllers/base.controller";
import {FastifyInstance} from "fastify";
import {IConfigurationService} from "@interfaces/configuration";
import {UpdateConfigurationDto} from "@infrastructure/http/controllers/configuration/dto";
import {toResultAsync} from "@shared/utils";
import {Request, Response} from "@interfaces/http";
import {ConfigurationMapper} from "@shared/mappers";

export class ConfigurationController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly configurationService: IConfigurationService
    )
    {
        super(_server)

        this.get(
            '/api/configuration',
            async (req, res) => this.getConfigurationRouteHandler(req, res, this.configurationService),
            null,
            ['administrator', 'affiliate'],
            true
        )

        this.put(
            '/api/configuration/:id',
            async (req, res) => this.updateConfigurationRouteHandler(req, res, this.configurationService),
            UpdateConfigurationDto,
            ['administrator'],
            true
        )
    }

    async getConfigurationRouteHandler(req: Request, res: Response, authService: IConfigurationService) {
        const [err, configuration] = await toResultAsync(authService.getConfiguration())

        if (err) {
            const message = !err.httpStatusCode ? 'Internal Server Error' : err.message
            const statusCode = err.httpStatusCode ?? 500
            console.error(err)
            return res.setStatusCode(statusCode).send({
                success: false,
                message
            })
        }

        res.setStatusCode(200).send({
            success: true,
            data: configuration ? ConfigurationMapper.toController(configuration) : configuration
        })
    }

    async updateConfigurationRouteHandler(req: Request, res: Response, authService: IConfigurationService) {
        const { id } = req.params as any
        const data = UpdateConfigurationDto.parse(req.body)

        const [err, configuration] = await toResultAsync(authService.updateConfiguration(id, data as any))

        if (err) {
            const message = !err.httpStatusCode ? 'Internal Server Error' : err.message
            const statusCode = err.httpStatusCode ?? 500
            console.error(err)
            return res.setStatusCode(statusCode).send({
                success: false,
                message
            })
        }

        res.setStatusCode(200).send({
            success: true,
            data: ConfigurationMapper.toController(configuration)
        })
    }

}