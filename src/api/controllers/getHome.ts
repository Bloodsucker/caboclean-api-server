import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import HomeNotExistError from "../../errors/HomeNotFoundError";
import { GetHomeParams } from "../routers";
import { NextFunction } from "express";

export async function getHome(req: Request<GetHomeParams>, res: Response, next: NextFunction): Promise<void> {
    const homeDoc = await HomeService.getHome(req.params.homeId);

    if(homeDoc instanceof HomeNotExistError) {
        res.status(404);
        next(homeDoc.message);
        return;
    }

    res.type('application/json');
    res.send(homeDoc);
}
