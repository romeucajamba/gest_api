import { ProductRepository } from "../interfaces/productRepository";
import { connectionBD } from "../lib/prisma";
import { Product, Prisma } from "@prisma/client";

export class ProductDatabase implements ProductRepository {
    private prisma = connectionBD;

    async register(data: Prisma.ProductCreateInput): Promise<Product> {
        const product = await this.prisma.product.create({ data });
        return product;
    }
    
    async list(): Promise<Product[] | null> {
        const product = await this.prisma.product.findMany();
        return product;
    }
    
    async getById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } });
        return product;
    }
    
    async update(from: string, to: string, rate: number): Promise<Product> {
        
        const productsToUpdate = await this.prisma.product.findMany({
            where: { currency: from },
          });

          const updatedProducts = await Promise.all(
            productsToUpdate.map(async (product) => {
              const newPrice = product.price * rate;
              return this.prisma.product.update({
                where: { id: product.id },
                data: {
                  price: newPrice,
                  currency: to,
                },
              });
            })
          );

          return updatedProducts[0];
    }
    
    async delete(id: number) {
        const product = await  this.prisma.product.delete({ where: { id } });
    }

}