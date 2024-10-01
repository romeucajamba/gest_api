import {describe, expect, test } from "vitest";
import { AuthenticateUseCase } from "../../../controllers/authenticate/useCases/authenticateUseCase";
import { InMemmoryRepository } from "../../../repository/userRepository/in-memory-repository";
import { hash } from "bcryptjs";
import { InvalidCredentials } from "../../../error/error";

describe("Authenticate use case", async () => {
    test.skip("It should be able authenticate user", async () => {
        
        const memoryRepository = new InMemmoryRepository();
        const sut = new AuthenticateUseCase(memoryRepository);

        await memoryRepository.register({
            name: "Imaculada Tomás",
            email: "imaculadatomas12@gmail.com",
            password_hash: await hash("Imaculadatomas123", 6)
        });
        
       const { user } = await sut.execute({
            email: "imaculadatomas12@gmail.com",
            password: "Imaculadatomas123"
        });

        expect(user.id).toEqual(expect.any(String))
    });

    test.skip("It should not be able authenticate with wrong email", async () => {
        
        const memoryRepository = new InMemmoryRepository();
        const sut = new AuthenticateUseCase(memoryRepository);

        await expect( () => sut.execute({
            email: "imaculadatomas12@gmail.com",
            password: "Imaculadatomas123"
        })).rejects.toBeInstanceOf(InvalidCredentials);
    });

    test.skip("It should not be able authenticate with wrong password", async () => {
        
        const memoryRepository = new InMemmoryRepository();
        const sut = new AuthenticateUseCase(memoryRepository);

        await memoryRepository.register({
            name: "Imaculada Tomás",
            email: "imaculadatomas12@gmail.com",
            password_hash: await hash("Imaculadatomas123", 6)
        });

       await expect( () => sut.execute({
            email: "imaculadatomas12@gmail.com",
            password: "Imaculadatomas"
        })).rejects.toBeInstanceOf(InvalidCredentials);
    });
});