import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { BadError } from '../../error/error';
import { updatePriceUseCase } from "../factory/update";

export async function updatePriceController(request: FastifyRequest, reply: FastifyReply){
  try {
        const bodySchema = z.object({
          from: z.string().length(3),
          to: z.string().length(3),
          rate: z.number().positive(),
    });

    const { from, rate, to } = bodySchema.parse(request.body);

    const products = updatePriceUseCase();
    const  updatedProducts = await products.execute({ from, rate, to });

    return reply.send(updatedProducts);

  } catch (error) {
    if (error instanceof BadError) {
       reply.status(500).send({message: error.message});
    }

    throw error;
  }
}