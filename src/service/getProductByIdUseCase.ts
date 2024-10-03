import { ProductRepository } from "../interfaces/productRepository";
import { ResourceNotFoundError } from "../error/error";
import { Response } from "../interfaces/Iproduct";

export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository){}

    async execute(id: number): Promise <Response>{
        const product = await this.productRepository.getById(id);

        if(!product){
            throw new ResourceNotFoundError();
        }

        return { product };
    }
}