import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {convertQueryParams, toResultAsync} from "@shared/utils";
import {FastifyInstance} from "fastify";
import {IMatchService} from "@interfaces/match";
import {CreateMatchDto} from "@infrastructure/http/controllers/match/dto";
import {MatchMapper} from "@shared/mappers";

export class MatchController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly matchService: IMatchService
    )
    {
        super(_server)

        this.post(
            '/api/match',
            async (req, res) => this.createMatchRouteHandler(req, res, this.matchService),
            CreateMatchDto,
            ['player', 'administrator'],
            true
        )

        this.get(
            '/api/match/:id',
            async (req, res) => this.getMatchRouteHandler(req, res, this.matchService),
            null,
            ['administrator'],
            true
        )

        this.get(
            '/api/match',
            async (req, res) => this.getAllMatchesRouteHandler(req, res, this.matchService),
            null,
            ['administrator'],
            true
        )
    }

    async createMatchRouteHandler(req: Request, res: Response, matchService: IMatchService) {
        const data = CreateMatchDto.parse(req.body)

        const [err, match] = await toResultAsync(matchService.create(data as any))

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
            data: MatchMapper.toController(match)
        })
    }

    async getMatchRouteHandler(req: Request, res: Response, matchService: IMatchService) {
        const { id } = req.params as any

        const [err, match] = await toResultAsync(matchService.findOneById(id))

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
            data: match ? MatchMapper.toController(match) : null
        });
    }

    async getAllMatchesRouteHandler(req: Request, res: Response, matchService: IMatchService) {
        const params = convertQueryParams(req.query as any)

        const [err, response] = await toResultAsync(matchService.findAll(params as any))

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
                transactions: response.matches.map(MatchMapper.toController),
                page: response.page,
                total: response.total
            }
        })
    }

}