import { ProductDatabase } from '../../repository/productDatabase';
import { GetProductByIdUseCase } from '../../service/getProductByIdUseCase';

export function getProductByIdUseCase(){
    const productRepository = new ProductDatabase();
    const useCase = new GetProductByIdUseCase(productRepository);

    return useCase;
}