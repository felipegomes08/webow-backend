import type {
    Response,
    Request,
    IController,
    RouteHandler,
    Routes
} from '@interfaces/http'
import { ZodSchema } from 'zod';

export class BaseController implements IController {
    private mappedRoutes: Routes = {};

    constructor(private readonly fastify: any) {}

    get routes(): Routes {
        return this.mappedRoutes;
    }

    public get(path: string, handler: RouteHandler, dto: ZodSchema | null, roles: string[] = [], requiresAuth: boolean = true) {
        this.routes['GET_'+path] = {
            method: 'GET',
            handler,
            middlewares: [
                async (req, res) => this.addRoleValidation(req, res, roles, requiresAuth),
                async (req, res) => this.addDtoValidation(req, res, dto)
            ]
        };
    }

    public post(path: string, handler: RouteHandler, dto: ZodSchema | null, roles: string[] = [], requiresAuth: boolean = true) {
        this.routes['POST_'+path] = {
            method: 'POST',
            handler,
            middlewares: [
                async (req, res) => this.addRoleValidation(req, res, roles, requiresAuth),
                async (req, res) => this.addDtoValidation(req, res, dto)
            ]
        };
    }

    public put(path: string, handler: RouteHandler, dto: ZodSchema | null, roles: string[] = [], requiresAuth: boolean = true) {
        this.routes['PUT_'+path] = {
            method: 'PUT',
            handler,
            middlewares: [
                async (req, res) => this.addRoleValidation(req, res, roles, requiresAuth),
                async (req, res) => this.addDtoValidation(req, res, dto)
            ]
        };
    }

    public patch(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[] = [], requiresAuth: boolean = true) {
        this.routes['PATCH_'+path] = {
            method: 'PATCH',
            handler,
            middlewares: [
                async (req, res) => this.addRoleValidation(req, res, roles, requiresAuth),
                async (req, res) => this.addDtoValidation(req, res, dto)
            ]
        };
    }

    public delete(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[] = [], requiresAuth: boolean = true) {
        this.routes['DELETE_'+path] = {
            method: 'DELETE',
            handler,
            middlewares: [
                async (req, res) => this.addRoleValidation(req, res, roles, requiresAuth),
                async (req, res) => this.addDtoValidation(req, res, dto)
            ]
        };
    }

    protected jwtSign(payload: any) {
        return this.fastify.jwt.sign({ payload })
    }

    protected addDtoValidation(req: Request, res: Response, dto: ZodSchema | null) {
        if (dto) {
            const data = dto.safeParse(req.body)

            if (!data.success) {
                return res.setStatusCode(400).send({
                    success: false,
                    errors: data.error.errors
                })
            }
        }
    }

    protected async addRoleValidation(req: any, res: any, roles: string[], requiresAuth: boolean) {
        if (requiresAuth) {
            await (this.fastify as any).authenticate(req, res);

            const user = req?.user;

            if (!roles.length || roles.includes(user.userType)) {
                req.user = user
            } else {
                res.setStatusCode(403)
                return res.send({ message: 'Forbidden' })
            }
        }
    }
}
