import { beforeEach, describe, expect, test } from "vitest";
import { CheckInInMemmoryRepository } from "../../../repository/checkinRepository/in-memory-checkin-repository";
import { FetchUserCheckinHistoryUseCase } from "../../../controllers/check-in/usecases/checkIn_history/member-checkin-history";
import {  ResourceNotFoundError } from "../../../error/error";

let checkInRepsotory: CheckInInMemmoryRepository;
let sut: FetchUserCheckinHistoryUseCase

describe("Member checkin history use case", async () => {
    beforeEach(() => {
        checkInRepsotory = new  CheckInInMemmoryRepository()
        sut = new FetchUserCheckinHistoryUseCase(checkInRepsotory);

    });

    test.skip("It should be able to fetch check in history", async () => {

        await checkInRepsotory.create({
            user_id: "user-01",
            gym_id: "gym-01"
        });
    
        await checkInRepsotory.create({
            user_id: "user-01",
            gym_id: "gym-02"
        });
        
        const { checkins } = await sut.execute({
            userId: 'user-01',
            page: 1
        });
    
        expect(checkins).toHaveLength(2);
        expect(checkins).toEqual([
            expect.objectContaining({ gym_id: "gym-01" }),
            expect.objectContaining({ gym_id: "gym-02" }),
        ]);
    });

    test.skip("it should be able to fetch paginated checkin in history", async () => {
        for(let i = 0; i <= 22; i++){
            await checkInRepsotory.create({
                user_id: "user-01",
                gym_id: `gym-${i}`
            });
        }

        const { checkins } = await sut.execute({
            userId: 'user-01',
            page: 2
        });
    
        expect(checkins).toHaveLength(3);
        expect(checkins).toEqual([
            expect.objectContaining({ gym_id: "gym-20" }),
            expect.objectContaining({ gym_id: "gym-21" }),
            expect.objectContaining({ gym_id: "gym-22" })
        ]);
    });
});