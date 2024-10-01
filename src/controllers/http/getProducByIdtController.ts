import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { BadError } from '../../error/error';
import { getProductByIdUseCase } from "../factory/getById";

export async function getProducByIdtController(request: FastifyRequest, reply: FastifyReply){
    try {
        const paramSchema = z.object({
            id: z.coerce.number()
        });

        const { id } = paramSchema.parse(request.params);
    
        const getProduct = getProductByIdUseCase()
      
        const getProductByid = await getProduct.execute(id);
      
        reply.status(200).send({message: getProductByid});
    
      } catch (err) {
        if(err instanceof BadError){
          reply.status(500).send({message: err.message})
        }
    
        throw err
      }
}