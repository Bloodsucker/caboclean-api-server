import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { HomeModelPublic as HomePublicModel } from "../../model/Home";
import { Error } from "mongoose";
import { Params } from "express-serve-static-core";

export async function postHome(req: Request<Params, HomePublicModel>, res: Response): Promise<void> {
    const newHome = await HomeService.createHome(req.body);

    if(newHome instanceof Error.ValidationError) {
        res.status(404);
        res.send(newHome.message);
        return;
    }

    res.send(newHome);
}
