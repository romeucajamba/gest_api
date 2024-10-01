import {  } from '';
import {  } from '';

export function registerProductUseCase(){
    const prismaRepository = new PrismaRepository();
    const useCase = new RegisterProductUsecase(prismaRepository);

    return useCase;
}