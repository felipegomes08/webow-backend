import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {IUserService} from "@interfaces/user";
import {RegisterUserDto} from "./dto";
import {toResultAsync} from "@shared/utils";
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

}