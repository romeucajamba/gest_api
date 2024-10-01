import { beforeEach, describe, expect, test, vi } from "vitest";
import { CheckInInMemmoryRepository } from "../../../repository/checkinRepository/in-memory-checkin-repository";
import { ValidateChackInUseCase } from "../../../controllers/check-in/usecases/validateCheckIn/validate-checkins";
import { ResourceNotFoundError } from "../../../error/error";

let sut: ValidateChackInUseCase;
let checkInRepsotory : CheckInInMemmoryRepository;

describe("Chekin use case", async () => {
    beforeEach(() => {
        checkInRepsotory = new CheckInInMemmoryRepository()
        sut = new ValidateChackInUseCase(checkInRepsotory);

    });

    test.skip("It should be able to validate check ins", async () => {

        const createdCheckin = await checkInRepsotory.create({
            user_id: "user-01",
            gym_id: "gym-01"
        });
        
        const { checkIn } = await sut.execute({
            checkInId: createdCheckin.id,
        });

        expect(checkIn?.validatedAt ).toEqual(expect.any(Date));
    });

    test.skip("It should be able to not validate inexistent check-in", async () => {

        expect( () => sut.execute({
            checkInId: "Inexistent check-in",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});