import { ProductDatabase } from '../../repository/productDatabase';
import { UpdatePriceUseCase } from '../../service/updatePriceUseCase';

export function updatePriceUseCase(){
    const productRepository = new ProductDatabase();
    const useCase = new UpdatePriceUseCase(productRepository);

    return useCase;
}