import {BaseController} from "@infrastructure/http/controllers/base.controller";
import {FastifyInstance} from "fastify";
import {IConfigurationService} from "@interfaces/configuration";
import {UpdateConfigurationDto} from "@infrastructure/http/controllers/configuration/dto";
import {toResultAsync} from "@shared/utils";
import {Request, Response} from "@interfaces/http";
import {
    AccountTypeMapper,
    ConfigurationMapper,
    MatchResultMapper, RouletteValueMapper,
    TransactionStatusMapper,
    TransactionTypeMapper, UserStatusMapper, UserTypeMapper
} from "@shared/mappers";
import {IMetadataService} from "@interfaces/metadata";

export class MetadataController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly metadataService: IMetadataService
    )
    {
        super(_server)

        this.get(
            '/api/metadata',
            async (req, res) => this.getMetadataRouteHandler(req, res, this.metadataService),
            null,
            ['administrator', 'affiliate', 'player'],
            true
        )

    }

    async getMetadataRouteHandler(req: Request, res: Response, authService: IMetadataService) {
        const [err, metadata] = await toResultAsync(authService.getMetadata())

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
            data: {
                transactionTypes: metadata.transactionTypes.map(TransactionTypeMapper.toController),
                accountTypes: metadata.accountTypes.map(AccountTypeMapper.toController),
                matchResults: metadata.matchResults.map(MatchResultMapper.toController),
                transactionStatus: metadata.transactionStatus.map(TransactionStatusMapper.toController),
                userTypes: metadata.userTypes.map(UserTypeMapper.toController),
                userStatus: metadata.userStatus.map(UserStatusMapper.toController),
                rouletteValues: metadata.rouletteValues.map(RouletteValueMapper.toController)
            }
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