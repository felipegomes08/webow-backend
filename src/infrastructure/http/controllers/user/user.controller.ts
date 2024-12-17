import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {IUserService} from "@interfaces/user";
import {CreateUserDto, RegisterUserDto, UpdateUserDto} from "./dto";
import {convertQueryParams, toResultAsync} from "@shared/utils";
import {UserMapper} from "@shared/mappers";
import {FastifyInstance} from "fastify";

export class UsersController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly userService: IUserService
    )
    {
        super(_server)

        this.post(
            '/api/auth/register',
            async (req, res) => this.registerUserRouteHandler(req, res, this.userService),
            RegisterUserDto,
            [],
            false
        )

        this.post(
            '/api/users',
            async (req, res) => this.createUserRouteHandler(req, res, this.userService),
            CreateUserDto,
            ['administrator'],
            true
        )

        this.put(
            '/api/users/:id',
            async (req, res) => this.updateUserRouteHandler(req, res, this.userService),
            UpdateUserDto,
            ['administrator', 'player'],
            true
        )

        this.get(
            '/api/users/:id',
            async (req, res) => this.getUserRouteHandler(req, res, this.userService),
            null,
            ['administrator'],
            true
        )

        this.get(
            '/api/users',
            async (req, res) => this.getAllUserRouteHandler(req, res, this.userService),
            null,
            ['administrator'],
            true
        )
    }

    async registerUserRouteHandler(req: Request, res: Response, userService: IUserService) {
        const data = RegisterUserDto.parse(req.body)

        const [err, user] = await toResultAsync(userService.registerUser(data))

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
            data: UserMapper.toController(user)
        })
    }

    async createUserRouteHandler(req: Request, res: Response, userService: IUserService) {
        const data = CreateUserDto.parse(req.body)

        const [err, user] = await toResultAsync(userService.createUser(data))

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
            data: UserMapper.toController(user)
        })
    }

    async updateUserRouteHandler(req: Request, res: Response, userService: IUserService) {
        const data = UpdateUserDto.parse(req.body)
        const userId = (req.params as any).id!

        const [err, user] = await toResultAsync(userService.updateUser(userId, data))

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
            data: UserMapper.toController(user)
        })
    }

    async getUserRouteHandler(req: Request, res: Response, userService: IUserService) {
        const { id } = req.params as any

        const [err, user] = await toResultAsync(userService.getUserById(id))

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
            data: user ? UserMapper.toController(user) : null
        });
    }

    async getAllUserRouteHandler(req: Request, res: Response, userService: IUserService) {
        const params = convertQueryParams(req.query as any)

        const [err, response] = await toResultAsync(userService.getAllUsers(params))

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