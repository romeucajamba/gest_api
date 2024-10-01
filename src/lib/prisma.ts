import { PrismaClient } from '@prisma/client';
import { env } from '../env';


export const connectionBD = new PrismaClient({
    log: env.NODE_ENV == 'dev' ? ['query'] : []
})