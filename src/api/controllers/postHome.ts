import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { Error } from "mongoose";
import { Params } from "express-serve-static-core";
import { NewHomePublicModel } from "../../model/Home";
import { NextFunction } from "express";

export async function postHome(req: Request<Params, NewHomePublicModel>, res: Response, next: NextFunction): Promise<void> {
    const newHome = await HomeService.createHome(req.body);

    if(newHome instanceof Error.ValidationError) {
        res.status(400);
        next(newHome.message);
        return;
    }

    res.status(201);
    res.type('application/json');
    res.send(newHome.toJSON());
}
