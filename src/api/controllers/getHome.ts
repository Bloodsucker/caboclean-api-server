import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import HomeNotExistError from "../../errors/HomeNotExistError";
import { ParamsDictionary } from "express-serve-static-core";

interface GetHomeParams extends ParamsDictionary {
    domain: string;
}

export async function getHome(req: Request<GetHomeParams>, res: Response): Promise<void> {
    const homeDoc = await HomeService.getHome(req.params.domain);

    if(homeDoc instanceof HomeNotExistError) {
        res.sendStatus(404);
        return;
    }

    res.type('application/json');
    res.send(homeDoc.toJSON());
}
