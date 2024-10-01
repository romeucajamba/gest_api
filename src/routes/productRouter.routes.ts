import { FastifyInstance } from "fastify";

import { registerProductController } from "../controllers/http/registerProductController";
import { deleteProductController } from "../controllers/http/deleteProductController";
import { getAllProductController } from "../controllers/http/getAllProductController";
import { getProducByIdtController } from "../controllers/http/getProducByIdtController";
import { updatePriceController } from "../controllers/http/updatePriceController";

export async function productRouter(app:FastifyInstance) {
    app.post('/product', registerProductController);
    app.post('/update-price', updatePriceController);
    app.get('/product', getAllProductController);
    app.get('/product/:id', getProducByIdtController);
    app.delete('/product/:id',deleteProductController)
}