import { ProductRepository } from "../interfaces/productRepository";
import { ResourceNotFoundError } from "../error/error";
import { ProductsResponse } from "../interfaces/Iproduct";

export class GetProductsUseCase {
    constructor(private productRepository: ProductRepository){}

    async execute(): Promise <ProductsResponse>{
        const product = await this.productRepository.list();

        if(!product){
            throw new ResourceNotFoundError();
        }
        
        return  { product };
    }
}