import {  } from '';
import {  } from '';

export function deleteProductUseCase(){
    const prismaRepository = new PrismaRepository();
    const useCase = new deleteProductUsecase(prismaRepository);

    return useCase;
}