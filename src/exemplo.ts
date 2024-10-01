import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const fastify = Fastify();
const prisma = new PrismaClient();

// Validação do produto com Zod
const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  price: z.number(),
  currency: z.string().length(3) // ISO 4217 ex: "USD"
});

// Rota para registrar produto
fastify.post('/products', async (request, reply) => {
  const productData = productSchema.safeParse(request.body);
  if (!productData.success) {
    return reply.status(400).send(productData.error);
  }

  const product = await prisma.product.create({
    data: productData.data,
  });
  return reply.status(201).send(product);
});

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

