export class BadError extends Error {}

export class ResourceNotFoundError extends Error {
    constructor(){
        super('Product not found❌')
    }
}