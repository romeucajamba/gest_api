import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify-jwt";
import {createCheckin} from "../controllers/check-in/http/createCheckin";
import { checkInHistory } from "../controllers/check-in/http/checkinHistory";
import { checkInMetrics } from "../controllers/check-in/http/checkinMetrics";
import { valideteCheckIn } from "../controllers/check-in/http/validateCheckin";
import { verifyUser } from "../middleware/verifyUserRole";

export async function checkInRouter(app:FastifyInstance){
    app.addHook('onRequest', verifyJWT);
    app.post('/gyms/:gymId/checkIn', createCheckin);
    app.get('/checkin/history', checkInHistory);
    app.get('/checkin/metrics', checkInMetrics);
    app.patch('/checkin/:checkInId/validate', {onRequest: [verifyUser("ADMIN")]}, valideteCheckIn)
}