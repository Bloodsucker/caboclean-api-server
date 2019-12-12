import NotExistError from "./NotExistError";

export default class HomeNotExist extends NotExistError {
    constructor(homeId: string) {
        super(`Home ${homeId} not found`);
    }
}