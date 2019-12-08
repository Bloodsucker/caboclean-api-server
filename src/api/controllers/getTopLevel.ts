import ExampleService from '../../services/ExampleService';
import { Request, Response } from '../../util/serverTypes';

export async function getTopLevel(req: Request, res: Response) {
    let outputStr = await ExampleService.topLevelAction(req.app.locals.db.mongoDb);
    res.send(outputStr);
}