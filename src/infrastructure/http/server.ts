import {PrismaClient} from "@prisma/client";
import {FastifyAdapter} from "@infrastructure/http/adapters";
import {userServiceFactory} from "@shared/factories";
import {UsersController} from "@infrastructure/http/controllers";

export async function bootstrap(prisma: PrismaClient) {
    const httpServer = new FastifyAdapter()

    const userService = userServiceFactory(prisma)
    const userController = new UsersController(httpServer.fastify, userService)

    await httpServer
        .addController(userController)
        .start()

    const shutdown = async (signal: string) => {
        console.log(`Received ${signal}, closing server...`);
        try {
            await httpServer.stop()
            console.log('HTTP server closed, closing Prisma connection...');

            await prisma.$disconnect();
            console.log('Prisma connection closed successfully.');

            process.exit(0);
        } catch (error) {
            console.error('Error closing server:', error);
            process.exit(1);
        }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
}