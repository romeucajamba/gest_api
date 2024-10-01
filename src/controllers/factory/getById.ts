import {  } from '';
import {  } from '';

export function getProductByIdUseCase(){
    const prismaRepository = new PrismaRepository();
    const useCase = new GetProducByIdtUsecase(prismaRepository);

    return useCase;
}