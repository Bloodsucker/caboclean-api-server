import NotExistError from "./NotExistError";

export default class HomeNotExist extends NotExistError {
    constructor() {
        super('Home');
    }
}