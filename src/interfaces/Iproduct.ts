import { Product } from "@prisma/client";

export interface Request {
    name: string, 
    brand: string, 
    model: string, 
    price: number, 
    currency: string
}

export interface PriceRequest {
    from: string, 
    rate: number, 
    to: string
}


export interface ProductsResponse {
    product: Product[]
}

export interface Response {
    product: Product
}