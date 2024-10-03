import { ProductDatabase } from '../../repository/productDatabase';
import { DeleteProductUseCase } from '../../service/deleteProductUseCase';

export function deleteProductUseCase(){
    const productRepository = new ProductDatabase();
    const useCase = new DeleteProductUseCase(productRepository);

    return useCase;
}