import {describe, expect, test } from "vitest";
import { GymUseCase} from "../../../controllers/academy/useCases/createGym/academyUseCase";
import { GymsInMemmoryGymRepository} from "../../../repository/gymRepository/in-memory-repository";
import { beforeEach } from "node:test";

let gymRepository: GymsInMemmoryGymRepository;
let sut: GymUseCase

describe("Create gym Use Case", async () => {

    beforeEach(() => {
        gymRepository = new GymsInMemmoryGymRepository()
        sut = new GymUseCase(gymRepository)
    });

    test.skip("It should be able create gym", async () => {

       const { gym } = await  sut.execute({
             title: "Gym Fitness",
             descriptions: "Academia Obros Grossos",
             phone: "929250911",
             latitude: -8.9041096,
             longitude: 13.5260975
        });

        expect(gym.id).toEqual(expect.any(String));
        expect(gym.title).toEqual(expect.any(String));
    });
});