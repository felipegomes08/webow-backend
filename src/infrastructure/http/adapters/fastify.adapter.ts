import type { IController, IServerHTTP, Request, Response } from '@interfaces/http';
import Fastify from 'fastify';
import fastifyJwt, { FastifyJWT } from '@fastify/jwt';
import path from 'path';
import { readFileSync } from 'fs';

export class FastifyAdapter implements IServerHTTP {
    private controllers: IController[] = [];

    private readonly server = Fastify({
        logger: true,
        bodyLimit: 999999999999,
    })

    constructor() {}

    addController(controller: IController): IServerHTTP {
        this.controllers.push(controller)
        return this;
    }

    async setRoutes() {
        for (const controller of this.controllers) {
            for(const path in controller.routes) {
                const route = controller.routes[path];
                const routePath = path.split('_')[1];
                this.server.route({
                    method: route.method,
                    url: routePath,
                    handler: async (request: any, reply: any) => {
                        const middlewares = route.middlewares || [];
                        const response: Response = {
                            setStatusCode: (code: number) => {
                                reply.statusCode = code;
                                return (reply as any) as Response
                            },
                            addHeader: (key: string, value: string) => {
                                reply.header(key, value)
                                return (reply as any) as Response
                            },
                            send: (payload: unknown) => {
                                reply.send(payload)
                            }
                        }

                        for (const middleware of middlewares) {
                            await middleware(request as Request, response as Response);
                            if (reply.sent) return;
                        }

                        return await route.handler(request as Request, response);
                    }
                })

                console.log(`Added ${route.method.toUpperCase()} route ${routePath}`)
            }
        }
    }

    async start(): Promise<void> {
        await this.setRoutes();

        this.server.register(fastifyJwt, {
            secret: {
                private: readFileSync(`${path.join(process.cwd(), 'certs')}/private.key`, 'utf8'),
                public: readFileSync(`${path.join(process.cwd(), 'certs')}/public.key`, 'utf8')
            },
            sign: { algorithm: 'RS256' }
        })

        this.server.decorate('authenticate', async (req: any, res: any) => {
            try {
                await req.jwtVerify();
            } catch (err) {
                res.send(err);
            }
        })

        this.server.decorate('validateDto', async (req: any, res: any) => {
            const data = req.dto.safeParse(req.body)

            if (!data.success) {
                return res.setStatusCode(400).send({
                    success: false,
                    errors: data.error.errors
                })
            }
        })

        await this.server.listen({
            port: 3000,
            host: '0.0.0.0'
        })
        console.log(`Server started on port ${3000}`)
    }

    async stop(): Promise<void> {
        await this.server.close();
    }

    get fastify() {
        return this.server
    }

    get jwt(): FastifyJWT {
        return this.server.jwt
    }

}