import NotFoundError from "./NotFoundError";

export default class HomeNotFoundError extends NotFoundError {
    constructor(homeId: string) {
        super(`Home ${homeId} not found`);
    }
}