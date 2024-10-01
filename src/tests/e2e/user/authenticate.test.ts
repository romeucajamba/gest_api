import { afterAll, beforeAll, test, expect, describe } from "vitest";
import { app } from "../../../app";
import request  from "supertest";

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    });

    afterAll(async () => {
        await app.close()
    })

    test.skip('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: "John Doe",
            email: "joedpel@gmail.com",
            password: "umastrig"
        });

        const response = await request(app.server).post('/session').send({
            email: "joedpel@gmail.com",
            password: "umastrig"
        });

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})