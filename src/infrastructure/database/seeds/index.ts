import { PrismaClient } from '@prisma/client'
import defaults from './defaults.json'

export class DatabaseSeed {
    constructor(private readonly prisma: PrismaClient)
    {}

    async execute() {
        await Promise.all([
            this.prisma.transactionType.createMany({
                data: defaults.transaction_type,
                skipDuplicates: true
            }),
            this.prisma.accountType.createMany({
                data: defaults.account_type,
                skipDuplicates: true
            }),
            this.prisma.matchResult.createMany({
                data: defaults.match_result,
                skipDuplicates: true
            }),
            this.prisma.requestStatus.createMany({
                data: defaults.request_status,
                skipDuplicates: true
            }),
            this.prisma.userType.createMany({
                data: defaults.user_type,
                skipDuplicates: true
            }),
            this.prisma.userStatus.createMany({
                data: defaults.user_status,
                skipDuplicates: true
            }),
        ]);

        console.log('database seeded successfully.');
    }
}