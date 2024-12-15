import { PrismaClient } from '@prisma/client'
import defaults from './defaults'

export class DatabaseSeed {
    constructor(private readonly prisma: PrismaClient)
    {}

    async execute() {
        const dbData = await Promise.all([
            this.prisma.transactionType.findMany(),
            this.prisma.accountType.findMany(),
            this.prisma.matchResult.findMany(),
            this.prisma.transactionStatus.findMany(),
            this.prisma.userType.findMany(),
            this.prisma.userStatus.findMany(),
        ])

        const cachDb = {
            transactionType: dbData[0].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {}),
            accountType: dbData[1].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {}),
            matchResult: dbData[2].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {}),
            transactionStatus: dbData[3].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {}),
            userType: dbData[4].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {}),
            userStatus: dbData[5].reduce((acc: Record<string, any>, data) => { acc[data.name] = data; return acc }, {})
        };

        for (const data of defaults.transactionType) {
            if (!cachDb.transactionType[data.name]) {
                await this.prisma.transactionType.create({
                    data
                });
            }
        }

        for (const data of defaults.accountType) {
            if (!cachDb.accountType[data.name]) {
                await this.prisma.accountType.create({
                    data
                });
            }
        }

        for (const data of defaults.matchResult) {
            if (!cachDb.matchResult[data.name]) {
                await this.prisma.matchResult.create({
                    data
                });
            }
        }

        for (const data of defaults.transactionStatus) {
            if (!cachDb.transactionStatus[data.name]) {
                await this.prisma.transactionStatus.create({
                    data
                });
            }
        }

        for (const data of defaults.userType) {
            if (!cachDb.userType[data.name]) {
                await this.prisma.userType.create({
                    data
                });
            }
        }

        for (const data of defaults.userStatus) {
            if (!cachDb.userStatus[data.name]) {
                await this.prisma.userStatus.create({
                    data
                });
            }
        }

        console.log('database seeded successfully.');
    }
}