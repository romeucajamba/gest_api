import { beforeEach, describe, expect, test, vi } from "vitest";
import { CheckInInMemmoryRepository } from "../../../repository/checkinRepository/in-memory-checkin-repository";
import { GetUserMetricsUseCase } from "../../../controllers/check-in/usecases/getUserCheckinMetrics/getCheckinsMetrics";

let sut: GetUserMetricsUseCase;
let checkInRepsotory : CheckInInMemmoryRepository;

describe("Chekin use case", async () => {
    beforeEach(() => {
        checkInRepsotory = new CheckInInMemmoryRepository()
        sut = new GetUserMetricsUseCase(checkInRepsotory);

    });

    test.skip("It should be able to get check ins count chek in from metrics", async () => {

        await checkInRepsotory.create({
            user_id: "user-01",
            gym_id: "gym-01"
        });
            
        await checkInRepsotory.create({
            user_id: "user-01",
            gym_id: "gym-02"
        });
        
        const { checkinsTotal } = await sut.execute({userId: "user-01"});

        expect(checkinsTotal).toEqual(expect.any(String));
    });

});