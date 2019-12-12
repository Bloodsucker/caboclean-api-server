import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import HomeNotExistError from "../../errors/HomeNotFoundError";
import { GetHomeParams } from "../routers";

export async function getHome(req: Request<GetHomeParams>, res: Response): Promise<void> {
    const homeDoc = await HomeService.getHome(req.params.homeId);

    if(homeDoc instanceof HomeNotExistError) {
        res.sendStatus(404);
        return;
    }

    res.type('application/json');
    res.send(homeDoc.toJSON());
}
