import type { Response, Request } from '@interfaces/http'
import { BaseController } from "../base.controller";
import {LoginDto, RefreshTokenDto} from "./dto";
import {toResultAsync} from "@shared/utils";
import {UserMapper} from "@shared/mappers";
import {FastifyInstance} from "fastify";
import {IAuthService} from "@interfaces/auth";

export class AuthController extends BaseController {

    constructor(
        _server: FastifyInstance,
        private readonly authService: IAuthService
    )
    {
        super(_server)

        this.post(
            '/api/auth/login',
            async (req, res) => this.loginRouteHandler(req, res, this.authService),
            LoginDto,
            [],
            false
        )

        this.post(
            '/api/auth/refresh-token',
            async (req, res) => this.refreshTokenRouteHandler(req, res, this.authService),
            RefreshTokenDto,
            [],
            false
        )
    }

    async loginRouteHandler(req: Request, res: Response, authService: IAuthService) {
        const data = LoginDto.parse(req.body)

        const [err, user] = await toResultAsync(authService.login(data))

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

    async refreshTokenRouteHandler(req: Request, res: Response, authService: IAuthService) {
        const data = RefreshTokenDto.parse(req.body)

        const [err, response] = await toResultAsync(authService.refreshToken(data))

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
            data: response
        })
    }

}