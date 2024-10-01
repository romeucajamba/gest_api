import {describe, expect, test } from "vitest";
import { InMemmoryRepository } from "../../../repository/userRepository/in-memory-repository";
import { GetUserProfileUseCase } from "../../../controllers/profile/useCase/getProfile/profiletUseCase";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../../../error/error";

describe("Profile use case", async () => {

    test.skip("It should not be able authenticate with wrong email", async () => {
        
        const memoryRepository = new InMemmoryRepository();
        const sut = new GetUserProfileUseCase(memoryRepository);
      
        const registerUser = await memoryRepository.register({
            name:"Romeu Cajamba",
            email:"romeucajamba@gmail.com",
            password_hash: await hash("12345", 6)
        });

        const { user } = await sut.execute({
            userId: registerUser.id,
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual("Romeu Cajamba")
    });

    test.skip("It should not be able get user with wrong id", async () => {
        
        const memoryRepository = new InMemmoryRepository();
        const sut = new GetUserProfileUseCase(memoryRepository);

        await expect(() => sut.execute({
            userId: "non-existing-id",
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    });
});