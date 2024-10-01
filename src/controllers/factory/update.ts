import {  } from '';
import {  } from '';

export function updatePriceUseCase(){
    const prismaRepository = new PrismaRepository();
    const useCase = new updatePriceUsecase(prismaRepository);

    return useCase;
}