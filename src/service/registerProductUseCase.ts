import { ProductRepository } from "../interfaces/productRepository";
import { BadError } from "../error/error";
import { Response, Request } from "../interfaces/Iproduct";

export class RegisterProductUseCase {
    constructor(private productRepository: ProductRepository){}

    async execute({name, brand, model, price, currency}: Request): Promise <Response>{

        const product = await this.productRepository.register({
            name, 
            brand, 
            model, 
            price, 
            currency
        });

        if(product instanceof BadError){
            throw new BadError("Product not registed");
        }

        return { product };
    }
}