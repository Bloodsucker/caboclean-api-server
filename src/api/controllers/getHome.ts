import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { HomeI } from "../../model/Home";
import HomeNotExistError from "../../errors/HomeNotExistError";


export async function getHome(req: Request, res: Response): Promise<void> {
    const homeDoc: HomeI | HomeNotExistError = await HomeService.getHome('example');

    if(homeDoc instanceof HomeNotExistError) {
        res.sendStatus(404);
        return;
    }

    res.type('application/json');
    res.send(homeDoc.toJSON());
}
