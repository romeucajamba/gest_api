import {  } from '';
import {  } from '';

export function getProductUseCase(){
    const prismaRepository = new PrismaRepository();
    const useCase = new GetProductUsecase(prismaRepository);

    return useCase;
}