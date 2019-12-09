import { Request, Response } from "../../util/serverTypes";
import ExampleService from "../../services/ExampleService";

export function getSecondLevel(req: Request, res: Response): void {
    const outputStr = ExampleService.secondLevelAction();
    res.send(outputStr);
}