import { ProductRepository } from "../interfaces/productRepository";
import { BadError } from "../error/error";
import { Response, PriceRequest } from "../interfaces/Iproduct";

export class UpdatePriceUseCase {
    constructor(private productRepository: ProductRepository){}

    async execute({ from, to, rate}: PriceRequest): Promise <Response>{

        const product = await this.productRepository.update(
            from,  
            to,
            rate
        );

        if(product instanceof BadError){
            throw new BadError("Price not updated");
        }

        return { product };
    }
}