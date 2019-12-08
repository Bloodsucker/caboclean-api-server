import { Request, Response } from "../../util/serverTypes";
import ExampleService from "../../services/ExampleService";

export async function getSecondLevel(req: Request, res: Response) {
    let outputStr = await ExampleService.secondLevelAction(req.app.locals.db.mongoDb);
    res.send(outputStr);
}