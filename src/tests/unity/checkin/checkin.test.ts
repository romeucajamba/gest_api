import {afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CheckInInMemmoryRepository } from "../../../repository/checkinRepository/in-memory-checkin-repository";
import { GymsInMemmoryGymRepository } from "../../../repository/gymRepository/in-memory-repository";
import { CheckInUseCase } from "../../../controllers/check-in/usecases/createCheckIn/check-in-UseCase";
import {  } from "../../../repository/gymRepository/in-memory-repository";
import { BadError } from "../../../error/error";
import { Decimal } from "@prisma/client/runtime/library";
import {  IvalidAcessInAcademy } from "../../../error/error";

let checkInRepsotory: CheckInInMemmoryRepository;
let gymMemoryRepository: GymsInMemmoryGymRepository;

describe("Chekin use case", async () => {
    beforeEach(() => {
        checkInRepsotory = new  CheckInInMemmoryRepository()
        gymMemoryRepository = new GymsInMemmoryGymRepository();

        gymMemoryRepository.create({
            id: 'gym-01',
            title: "Academia Treinar com garra",
            descriptions: "Vem treinar com bons fisoculturistas",
            phone: "943558106",
            latitude: new Decimal(-8.986752),
            longitude: new Decimal(13.313551)
        });

        vi.useFakeTimers()
    });
    afterEach(() =>{
        vi.useRealTimers()
    });

    test.skip("It should be able to create chek in", async () => {
        const sut = new CheckInUseCase(checkInRepsotory, gymMemoryRepository);

        const { checkin } = await  sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -8.986752,
            userLongitude: 13.313551
        });

        expect(checkin.id).toEqual(expect.any(String));
    });
    
    test.skip("It should not be able to chek in twince in the same day", async () => {
        const sut = new CheckInUseCase(checkInRepsotory, gymMemoryRepository);

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await  sut.execute({
            userId: 'user-02',
            gymId: 'gym-01',
            userLatitude: -8.986752,
            userLongitude: 13.313551
        });

        await expect(() => sut.execute ({
            userId: 'user-02',
            gymId: 'gym-01',
            userLatitude: -8.986752,
            userLongitude: 13.313551  
        })).rejects.toBeInstanceOf(BadError);
    });

    test.skip("It should be able to chek in twince in diferent day", async () => {
        const sut = new CheckInUseCase(checkInRepsotory, gymMemoryRepository);

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await  sut.execute({
            userId: 'user-02',
            gymId: 'gym-01',
            userLatitude: -8.986752,
            userLongitude: 13.313551
        });

        vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0));

        const { checkin } = await sut.execute ({
            userId: 'user-02',
            gymId: 'gym-01',
            userLatitude: -8.986752,
            userLongitude: 13.313551  
        })

        expect(checkin.id).toEqual(expect.any(String));
    });
    test.skip("It should  not be able to chek in on distant gym", async () => {
        const sut = new CheckInUseCase(checkInRepsotory, gymMemoryRepository);

        gymMemoryRepository.create({
            id:'gym-02',
            title: "Academia Treinar com garra e peso",
            descriptions: "Vem treinar com bons fisoculturistas",
            phone: "943558106",
            latitude: new Decimal(-8.9041096),
            longitude: new Decimal(13.5260975)
        });

        await expect(() => sut.execute({
            userId: 'user-01',
            gymId: 'gym-02',
            userLatitude: -8.986752,
            userLongitude: 13.313551
        })).rejects.toBeInstanceOf(IvalidAcessInAcademy);
    });
});