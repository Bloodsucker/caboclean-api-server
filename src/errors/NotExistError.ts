export default class NotExistError extends Error {
    constructor(objectType: string) {
        super(`${objectType} does't exist`)
    }
}
