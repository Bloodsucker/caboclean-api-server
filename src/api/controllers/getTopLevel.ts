import ExampleService from '../../services/ExampleService';
import { Request, Response } from '../../util/serverTypes';

export function getTopLevel(req: Request, res: Response): void {
    const outputStr = ExampleService.topLevelAction();
    res.send(outputStr);
}