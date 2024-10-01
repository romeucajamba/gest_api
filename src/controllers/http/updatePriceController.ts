import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { BadError } from '../../error/error';

export async function updatePriceController(){}


// Rota para aplicar câmbio e atualizar os preços
fastify.post('/products/update-prices', async (request, reply) => {
    const { from, to, rate } = z
      .object({
        from: z.string().length(3),
        to: z.string().length(3),
        rate: z.number().positive(),
      })
      .parse(request.body);
  
    // Obtem os produtos na moeda original e atualiza os preços
    const productsToUpdate = await prisma.product.findMany({
      where: { currency: from },
    });
  
    const updatedProducts = await Promise.all(
      productsToUpdate.map(async (product) => {
        const newPrice = product.price * rate;
        return prisma.product.update({
          where: { id: product.id },
          data: {
            price: newPrice,
            currency: to,
          },
        });
      })
    );
  
    return reply.send(updatedProducts);
  });