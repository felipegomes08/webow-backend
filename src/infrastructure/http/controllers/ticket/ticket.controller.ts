import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {convertQueryParams, toResultAsync} from "@shared/utils";
import {TicketMapper, TicketMessageMapper} from "@shared/mappers";
import {FastifyInstance} from "fastify";
import {ITicketService} from "@interfaces/ticket";
import {CreateTicketDto, SendTicketMessageDto, UpdateTicketDto} from "@infrastructure/http/controllers/ticket/dto";

export class TicketController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly ticketService: ITicketService
    )
    {
        super(_server)

        this.post(
            '/api/ticket',
            async (req, res) => this.createTicketRouteHandler(req, res, this.ticketService),
            CreateTicketDto,
            [],
            false
        )

        this.put(
            '/api/ticket/:id',
            async (req, res) => this.updateTicketRouteHandler(req, res, this.ticketService),
            UpdateTicketDto,
            ['administrator'],
            true
        )

        this.delete(
            '/api/ticket/:id',
            async (req, res) => this.deleteTicketRouteHandler(req, res, this.ticketService),
            null,
            ['administrator'],
            true
        )

        this.post(
            '/api/ticket/:id/messages',
            async (req, res) => this.sendTicketMessageRouteHandler(req, res, this.ticketService),
            SendTicketMessageDto,
            [],
            false
        )

        this.get(
            '/api/ticket/:id/messages',
            async (req, res) => this.getTicketMessagesRouteHandler(req, res, this.ticketService),
            null,
            [],
            true
        )

        this.get(
            '/api/ticket',
            async (req, res) => this.getAllTicketsRouteHandler(req, res, this.ticketService),
            null,
            ['administrator'],
            true
        )

        this.get(
            '/api/ticket/:id',
            async (req, res) => this.getTicketRouteHandler(req, res, this.ticketService),
            null,
            ['administrator'],
            true
        )

    }

    async createTicketRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const data = CreateTicketDto.parse(req.body)

        const [err, ticket] = await toResultAsync(ticketService.create(data))

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
            data: TicketMapper.toController(ticket)
        })
    }

    async updateTicketRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const data = UpdateTicketDto.parse(req.body)
        const ticketId = (req.params as any).id!

        const [err, ticket] = await toResultAsync(ticketService.update(ticketId, data))

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
            data: TicketMapper.toController(ticket)
        })
    }

    async deleteTicketRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const { id } = req.params as any

        const [err] = await toResultAsync(ticketService.delete(id))

        if (err) {
            const message = !err.httpStatusCode ? 'Internal Server Error' : err.message
            const statusCode = err.httpStatusCode ?? 500
            console.error(err)
            return res.setStatusCode(statusCode).send({
                success: false,
                message
            })
        }

        res.setStatusCode(204).send({
            success: true,
            data: null
        });
    }

    async getTicketRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const { id } = req.params as any

        const [err, ticket] = await toResultAsync(ticketService.getOneById(id))

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
            data: ticket ?  TicketMapper.toController(ticket) : null
        });
    }

    async getAllTicketsRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const queryParams = convertQueryParams((req as any).query)

        const [err, response] = await toResultAsync(ticketService.getAll(queryParams))

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
                ...response,
                tickets: response.tickets.map(TicketMapper.toController)
            }
        });
    }

    async getTicketMessagesRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const { id } = req.params as any

        const [err, messages] = await toResultAsync(ticketService.getAllMessages(id))

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
            data: messages.map(TicketMessageMapper.toController)
        });
    }

    async sendTicketMessageRouteHandler(req: Request, res: Response, ticketService: ITicketService) {
        const data = SendTicketMessageDto.parse(req.body)

        const [err, message] = await toResultAsync(ticketService.sendMessage(data))

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
            data: TicketMessageMapper.toController(message)
        })
    }
}