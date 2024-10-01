import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { BadError } from '../../error/error';
import { registerProductUseCase } from "../factory/register";

export async function registerProductController( request: FastifyRequest, reply: FastifyReply){
  
  try {
    
    const productSchema = z.object({
      name: z.string(),
      brand: z.string(),
      model: z.string(),
      price: z.number(),
      currency: z.string().length(3) 
    });

    const { name, brand, model, price, currency } = productSchema.parse(request.body);

    const registerProduct = registerProductUseCase()
  
    await registerProduct.execute({
      name, 
      brand, 
      model, 
      price, 
      currency
    });

  } catch (err) {
    if(err instanceof BadError){
      reply.status(500).send({message: err.message})
    }

    throw err
  }
  
  reply.status(201).send({message: "Prduct created ✔"});
}