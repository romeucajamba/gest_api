import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { productRouter } from "./routes/productRouter.routes";

export const app = fastify();

app.register(productRouter);

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation error.', issues: error.format()})
    }

    if(env.NODE_ENV != 'production'){
        console.error(error)
    }
    else {
    
    }

    return reply.status(500).send({message:'erro interno no servidor'})
})