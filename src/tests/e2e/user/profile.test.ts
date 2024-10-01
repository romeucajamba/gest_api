import { afterAll, beforeAll, test, expect, describe } from "vitest";
import { app } from "../../../app";
import request  from "supertest";

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    });

    afterAll(async () => {
        await app.close()
    })

    test.skip('should be able to get  user profile', async () => {
         await request(app.server).post('/users').send({
            name: "John Doe",
            email: "joedpel@gmail.com",
            password: "umastrig"
        });

        const authResponse = await request(app.server).post('/session').send({
            email: "joedpel@gmail.com",
            password: "umastrig"
        });

        const {token} = authResponse.body;

       const profileResponse = await request(app.server).get('/me')
       .set('Authorization', `Bearer ${token}`).send()


       expect(profileResponse.statusCode).toEqual(200);
       expect(profileResponse.body.user).toEqual(expect.objectContaining({
        email: "joedpel@gmail.com"
       }))

    })
})