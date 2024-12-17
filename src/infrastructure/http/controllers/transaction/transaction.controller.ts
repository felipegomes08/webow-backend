import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {convertQueryParams, toResultAsync} from "@shared/utils";
import {FastifyInstance} from "fastify";
import {ITransactionService} from "@interfaces/transaction";
import {CreateTransactionDto, UpdateTransactionDto} from "@infrastructure/http/controllers/transaction/dto";
import {TransactionMapper} from "@shared/mappers/transaction.mapper";

export class TransactionController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly transactionService: ITransactionService
    )
    {
        super(_server)

        this.post(
            '/api/transaction/:type',
            async (req, res) => this.createTransactionRouteHandler(req, res, this.transactionService),
            CreateTransactionDto,
            ['player', 'affiliate', 'administrator'],
            true
        )

        this.put(
            '/api/transaction/:id',
            async (req, res) => this.updateTransactionRouteHandler(req, res, this.transactionService),
            UpdateTransactionDto,
            ['administrator'],
            true
        )

        this.get(
            '/api/transaction/:id',
            async (req, res) => this.getTransactionRouteHandler(req, res, this.transactionService),
            null,
            ['administrator'],
            true
        )

        this.get(
            '/api/transaction',
            async (req, res) => this.getAllTransactionsRouteHandler(req, res, this.transactionService),
            null,
            ['administrator', 'áffiliate'],
            true
        )
    }

    async createTransactionRouteHandler(req: Request, res: Response, transactionService: ITransactionService) {
        const data = CreateTransactionDto.parse(req.body)

        const { type } = req.params as any

        const [err, transaction] = await toResultAsync(transactionService.createTransaction(type!, data))

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
            data: TransactionMapper.toController(transaction)
        })
    }

    async updateTransactionRouteHandler(req: Request, res: Response, transactionService: ITransactionService) {
        const data = UpdateTransactionDto.parse(req.body)
        const transactionId = (req.params as any).id!

        const [err, transaction] = await toResultAsync(transactionService.updateTransaction(transactionId, data as any))

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
            data: TransactionMapper.toController(transaction)
        })
    }

    async getTransactionRouteHandler(req: Request, res: Response, transactionService: ITransactionService) {
        const { id } = req.params as any

        const [err, transaction] = await toResultAsync(transactionService.getTransactionById(id))

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
            data: transaction ? TransactionMapper.toController(transaction) : null
        });
    }

    async getAllTransactionsRouteHandler(req: Request, res: Response, transactionService: ITransactionService) {
        const params = convertQueryParams(req.query as any)

        const [err, response] = await toResultAsync(transactionService.getAll(params as any))

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
                transactions: response.transactions.map(TransactionMapper.toController),
                page: response.page,
                total: response.total
            }
        })
    }

}