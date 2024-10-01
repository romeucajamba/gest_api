import 'dotenv/config';
import { z } from 'zod';
import { BadError } from '../error/error';


const schemaEnv = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(4000)
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success == false){
    console.error('Variáveis de ambiente inválida', _env.error.format())

    throw new BadError('Variáveis de ambiente inválida')
}

export const env = _env.data