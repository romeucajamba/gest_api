import { ProductRepository } from "../interfaces/productRepository";
import { ResourceNotFoundError } from "../error/error";

export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository){}

    async execute(id: number){
        const product = await this.productRepository.getById(id);

        if(!product){
            throw new ResourceNotFoundError();
        }

        await this.productRepository.delete(id);

        return 'Product deleted successfully';
    }
}