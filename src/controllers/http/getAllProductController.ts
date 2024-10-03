import { FastifyRequest, FastifyReply } from 'fastify';
import { BadError } from '../../error/error';
import { getProductUseCase } from "../factory/get";

export async function getAllProductController(request: FastifyRequest, reply: FastifyReply){
    try {
    
        const getProducts = getProductUseCase();
      
        const getProduct = await getProducts.execute();
      
        reply.status(200).send({message: getProduct});
    
      } catch (err) {
        if(err instanceof BadError){
          reply.status(500).send({message: err.message})
        }
    
        throw err
      }
}