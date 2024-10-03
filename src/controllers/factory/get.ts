import { ProductDatabase } from '../../repository/productDatabase';
import { GetProductsUseCase } from '../../service/getProductsUseCase';

export function getProductUseCase(){
    const productRepository = new ProductDatabase();
    const useCase = new GetProductsUseCase(productRepository);

    return useCase;
}