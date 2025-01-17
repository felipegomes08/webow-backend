import { PrismaClient } from "@prisma/client";
import {TicketService} from "../../application/services";
import {
    PrismaTicketMessageRepository,
    PrismaTicketRepository,
    PrismaUserRepository
} from "@infrastructure/database/prisma";

export function ticketsServiceFactory(prisma: PrismaClient) {

    return new TicketService(
        new PrismaTicketRepository(prisma),
        new PrismaTicketMessageRepository(prisma),
        new PrismaUserRepository(prisma)
    );

}