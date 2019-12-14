import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { Error } from "mongoose";
import { Params } from "express-serve-static-core";
import { NewHomePublicModel } from "../../model/Home";

export async function postHome(req: Request<Params, NewHomePublicModel>, res: Response): Promise<void> {
    const newHome = await HomeService.createHome(req.body);

    if(newHome instanceof Error.ValidationError) {
        res.status(404);
        res.send(newHome.message);
        return;
    }

    res.type('application/json');
    res.send(newHome.toJSON());
}
