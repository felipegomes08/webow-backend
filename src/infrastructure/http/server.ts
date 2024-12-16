import {PrismaClient} from "@prisma/client";
import {FastifyAdapter} from "@infrastructure/http/adapters";
import {affiliateServiceFactory, authServiceFactory, userServiceFactory} from "@shared/factories";
import {AuthController, UsersController} from "@infrastructure/http/controllers";
import {AffiliateController} from "@infrastructure/http/controllers/affiliate/affiliate.controller";

export async function bootstrap(prisma: PrismaClient) {
    const httpServer = new FastifyAdapter()

    const userService = userServiceFactory(prisma)
    const authService = authServiceFactory(prisma);
    const affiliateService = affiliateServiceFactory(prisma);

    const userController = new UsersController(httpServer.fastify, userService)
    const authController = new AuthController(httpServer.fastify, authService)
    const affiliateController = new AffiliateController(httpServer.fastify, affiliateService)

    await httpServer
        .addController(authController)
        .addController(userController)
        .addController(affiliateController)
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