import { ProductDatabase } from '../../repository/productDatabase';
import { RegisterProductUseCase } from '../../service/registerProductUseCase';

export function registerProductUseCase(){
    const productRepository = new ProductDatabase();
    const useCase = new RegisterProductUseCase(productRepository);

    return useCase;
}