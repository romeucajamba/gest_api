import { Prisma, Product } from "@prisma/client";

export interface ProductRepository {
    register(data: Prisma.ProductCreateInput): Promise <Product>;
    list(): Promise <Product[] | null>;
    getById(id: number): Promise <Product | null>;
    update(from: string, to: string, role: number): Promise <Product>
    delete(id: number): Promise <Product>
}