import { describe, test, beforeEach, expect } from "vitest";
import { SearchGymUseCase } from "../../../controllers/academy/useCases/getGym/search_gyms";
import { GymsInMemmoryGymRepository } from "../../../repository/gymRepository/in-memory-repository";

let gymRepository: GymsInMemmoryGymRepository;
let sut : SearchGymUseCase;

describe('Serach Gyms use case', async () => {
    beforeEach(() => {
        gymRepository = new GymsInMemmoryGymRepository();
        sut = new SearchGymUseCase(gymRepository)
    });

    test.skip("it should be able to search for gyms", async () => {
        await gymRepository.create({
            title: "Fitness",
            descriptions: "Academia Obros Grossos",
            phone: "929250911",
            latitude: -8.9041096,
            longitude: 13.5260975
        });

        await gymRepository.create({
            title: "Gym",
            descriptions: "Academia Obros Grossos",
            phone: "929250911",
            latitude: -8.9041096,
            longitude: 13.5260975
        });

        const { getGyms } = await sut.execute({
            query:"Gym",
            page: 1
        });
    
        expect(getGyms).toHaveLength(1);
        expect(getGyms).toEqual([
            expect.objectContaining({ title: "Gym" }),
        ]);
    })

    test.skip("it should be able to search for gyms", async () => {
        for(let i = 0; i <= 22; i++){
            await gymRepository.create({
                title: `Javascript Gym ${i}`,
                descriptions: "Academia Obros Grossos",
                phone: "929250911",
                latitude: -8.9041096,
                longitude: 13.5260975
            });
        }

        const { getGyms } = await sut.execute({
            query:"Gym",
            page: 2
        });
    
        expect(getGyms).toHaveLength(3);
        expect(getGyms).toEqual([
            expect.objectContaining({ title: "Javascript Gym 20" }),
            expect.objectContaining({ title: "Javascript Gym 21" }),
            expect.objectContaining({ title: "Javascript Gym 22" })
        ]);
    })
});