import { MongoClient } from "mongodb";

export default class ExampleService {
    static async topLevelAction(mongodb:MongoClient /* more necessary arguments... */){
        return 'Top level action.';
    }

    static async secondLevelAction(mongodb:MongoClient /* more necessary arguments... */) {
        return 'Second level action.';
    }
}
