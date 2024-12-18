import {PrismaClient} from "@prisma/client";
import {FastifyAdapter} from "@infrastructure/http/adapters";
import {
    affiliateServiceFactory,
    authServiceFactory,
    configurationServiceFactory, matchServiceFactory, metadataServiceFactory, transactionServiceFactory,
    userServiceFactory
} from "@shared/factories";
import {
    AuthController,
    ConfigurationController, MatchController,
    MetadataController, TransactionController,
    UsersController
} from "@infrastructure/http/controllers";
import {AffiliateController} from "@infrastructure/http/controllers/affiliate/affiliate.controller";

export async function bootstrap(prisma: PrismaClient) {
    const httpServer = new FastifyAdapter()

    const userService = userServiceFactory(prisma)
    const authService = authServiceFactory(prisma);
    const affiliateService = affiliateServiceFactory(prisma);
    const configurationService = configurationServiceFactory(prisma);
    const metadataService = metadataServiceFactory(prisma);
    const transactionService = transactionServiceFactory(prisma);
    const matchService = matchServiceFactory(prisma);

    const userController = new UsersController(httpServer.fastify, userService)
    const authController = new AuthController(httpServer.fastify, authService)
    const affiliateController = new AffiliateController(httpServer.fastify, affiliateService)
    const configurationController = new ConfigurationController(httpServer.fastify, configurationService)
    const metadataController = new MetadataController(httpServer.fastify, metadataService)
    const transactionController = new TransactionController(httpServer.fastify, transactionService)
    const matchController = new MatchController(httpServer.fastify, matchService)

    await httpServer
        .addController(authController)
        .addController(userController)
        .addController(affiliateController)
        .addController(configurationController)
        .addController(metadataController)
        .addController(transactionController)
        .addController(matchController)
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