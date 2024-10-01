import { registerUser } from '../controllers/users/http/register';
import { FastifyInstance } from "fastify";
import { AutenticateUser } from '../controllers/authenticate/http/autenticateController';
import { profileController } from "../controllers/profile/http/profileController";
import { verifyJWT } from "../middleware/verify-jwt";
import {refreshToken} from "../controllers/authenticate/http/refreshToken";

export async function UserRouter(app:FastifyInstance){
    app.post('/users', registerUser);
    app.post('/session', AutenticateUser);
    app.patch('/token/refresh', refreshToken)// Rota deve ser chamada quando o usuário perde a autenticação, quando o token não form mais váluido
    /**Authenticated */
    app.get('/me', {onRequest: [verifyJWT]}, profileController);
}