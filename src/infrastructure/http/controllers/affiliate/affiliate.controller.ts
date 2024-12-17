import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {IAffiliateService} from "@interfaces/affiliate";
import {convertQueryParams, toResultAsync} from "@shared/utils";
import {AffiliateMapper, UserMapper} from "@shared/mappers";
import {FastifyInstance} from "fastify";
import {CreateAffiliateDto, UpdateAffiliateDto} from "@infrastructure/http/controllers/affiliate/dto";

export class AffiliateController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly affiliateService: IAffiliateService
    )
    {
        super(_server)

        this.post(
            '/api/affiliates',
            async (req, res) => this.createAffiliateRouteHandler(req, res, this.affiliateService),
            CreateAffiliateDto,
            ['administrator'],
            true
        )

        this.put(
            '/api/affiliates/:id',
            async (req, res) => this.updateAffiliateRouteHandler(req, res, this.affiliateService),
            UpdateAffiliateDto,
            ['administrator', 'affiliate'],
            true
        )

        this.get(
            '/api/affiliates',
            async (req, res) => this.getAllAffiliatesRouteHandler(req, res, this.affiliateService),
            null,
            ['administrator'],
            true
        )

        this.get(
            '/api/affiliates/:id/players',
            async (req, res) => this.getAllAffiliatePlayersRouteHandler(req, res, this.affiliateService),
            null,
            ['administrator', 'affiliate'],
            true
        )
    }

    async createAffiliateRouteHandler(req: Request, res: Response, affiliateService: IAffiliateService) {
        const data = CreateAffiliateDto.parse(req.body)

        const [err, affiliate] = await toResultAsync(affiliateService.createAffiliate(data))

        if (err) {
            const message = !err.httpStatusCode ? 'Internal Server Error' : err.message
            const statusCode = err.httpStatusCode ?? 500
            console.error(err)
            return res.setStatusCode(statusCode).send({
                success: false,
                message
            })
        }

        res.setStatusCode(201).send({
            success: true,
            data: AffiliateMapper.toController(affiliate)
        })
    }

    async updateAffiliateRouteHandler(req: Request, res: Response, affiliateService: IAffiliateService) {
        const data = UpdateAffiliateDto.parse(req.body)
        const affiliateId = (req.params as any).id!

        const [err, affiliate] = await toResultAsync(affiliateService.updateAffiliate(affiliateId, data as any))

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
            data: AffiliateMapper.toController(affiliate)
        })
    }

    async getAllAffiliatesRouteHandler(req: Request, res: Response, affiliateService: IAffiliateService) {
        const queryParams = convertQueryParams(req.query as any)

        const [err, response] = await toResultAsync(affiliateService.getAllAffiliates(queryParams))

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
                affiliates: response.affiliates.map(AffiliateMapper.toController),
                page: response.page,
                total: response.total
            }
        })
    }

    async getAllAffiliatePlayersRouteHandler(req: Request, res: Response, affiliateService: IAffiliateService) {
        const { id } = req.params as any
        const queryParams = convertQueryParams(req.query as any)

        const [err, response] = await toResultAsync(affiliateService.getAffiliatePlayers(id, queryParams))

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
                users: response.users.map(UserMapper.toController),
                page: response.page,
                total: response.total
            }
        })
    }

}