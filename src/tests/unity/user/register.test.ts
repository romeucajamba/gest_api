import {describe, expect, test } from "vitest";
import {RegisterUsecase} from "../../../controllers/users/useCases/registerUseCase";
import { UserPrismaRepository} from "../../../repository/userRepository/userprismarepository";
import { InMemmoryRepository } from "../../../repository/userRepository/in-memory-repository";
import { compare } from "bcryptjs";
import { EmailAlreadyExist } from "../../../error/error"

describe("Register use case", async () => {
    test.skip("Should be able register user", async () => {
        
        const memoryRepository = new InMemmoryRepository()
        const userRepository = new UserPrismaRepository();
        const userUseCase = new RegisterUsecase(memoryRepository);
        
       const { user } = await userUseCase.execute({
                name: "Imaculada Tomas",
                email: "imaculadatomas12@gmail.com",
                password: "Imaculadatomas123"
        });

        console.log(user.name);
        expect(user.id).toEqual(expect.any(String))
    });
    test.skip("Should hash password", async () => {
        
        const memoryRepository = new InMemmoryRepository()
        const userRepository = new UserPrismaRepository();
        const userUseCase = new RegisterUsecase(memoryRepository);
        
       const { user } = await userUseCase.execute({
                name: "Imaculada Tomas",
                email: "imaculadatomas12@gmail.com",
                password: "00123"
        });

        const isPasswordCorrecthashed = await compare(
            '00123',
            user.password_hash
        );
        console.log(isPasswordCorrecthashed);

        expect(isPasswordCorrecthashed).toBe(true);
    });

    test.skip("Should not be able to regiter the same email twice", async () => {
        
        const memoryRepository = new InMemmoryRepository()
        const userRepository = new UserPrismaRepository();
        const userUseCase = new RegisterUsecase(memoryRepository);

        const email: string = "imaculadatomas12@gmail.com";

        await userUseCase.execute({
                name: "Imaculada Tomas",
                email,
                password: "00123"
        });


        await expect(() =>
             userUseCase.execute({
                name: "Imaculada Tomas",
                email,
                password: "00123"
        })).rejects.toBeInstanceOf(EmailAlreadyExist);
    });
});