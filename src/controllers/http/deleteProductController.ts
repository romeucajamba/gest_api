import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { deleteProductUseCase } from "../factory/delete";
import { BadError } from '../../error/error';

export async function deleteProductController(request:FastifyRequest, reply: FastifyReply){
    try {

        const paramSchema = z.object({
            id: z.coerce.number()
        });

        const { id } = paramSchema.parse(request.params);
    
        const deleteProduct = deleteProductUseCase()
      
        const getProduct = await deleteProduct.execute(id);
      
        reply.status(200).send({message: getProduct});
    
      } catch (err) {
        if(err instanceof BadError){
          reply.status(500).send({message: err.message})
        }
    
        throw err
      }
}