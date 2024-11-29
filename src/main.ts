import prisma from '@shared/lib/prisma'
import {DatabaseSeed} from "@infrastructure/database/seeds";
import { bootstrap } from '@infrastructure/http/server'

new DatabaseSeed(prisma)
    .execute()
    .then(() => {
        bootstrap(prisma)
    })
    .catch(err => {
        console.error(err);
    });




