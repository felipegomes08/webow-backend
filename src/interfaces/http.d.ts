import { IncomingMessage, ServerResponse } from "http";

export type Request = Partial<IncomingMessage> & {
    params: object;
    body: object;
    query: object;
};

export type Response = Partial<ServerResponse<IncomingMessage>> & {
    send: (payload: unknown) => void;
    setStatusCode: (code: number) => Response;
    addHeader: (key: string, value: string) => Response;
};

export type RouteMiddleware = (req: Request, res: Response) => Promise<void>

export type RouteHandler = (req: Request, res: Response) => Promise<unknown>

export type Route = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    middlewares?: RouteMiddleware[];
    handler: RouteHandler;
};

export type Routes = {
    [key: string]: Route;
}

export interface IController {
    get routes(): Routes;
    get(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[], requiredAuth: boolean): void;
    post(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[], requiredAuth: boolean): void;
    put(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[], requiredAuth: boolean): void;
    patch(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[], requiredAuth: boolean): void;
    delete(path: string, handler: RouteHandler, dto: ZodSchema, roles: string[], requiredAuth: boolean): void;
}

export interface IServerHTTP {
    start(): Promise<void>;
    stop(callback: (err?: Error) => Promise<void>): Promise<void>;
    addController(controller: IController): IServerHTTP;
}