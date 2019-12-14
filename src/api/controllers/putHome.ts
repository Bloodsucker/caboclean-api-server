import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { GetHomeParams } from "../routers";
import { HomePublicModel } from "../../model/Home";
import { Error } from "mongoose";
import { NextFunction } from "express";

export async function putHome(req: Request<GetHomeParams, HomePublicModel>, res: Response, next: NextFunction): Promise<void> {
    const err = await HomeService.putHome(req.body);
    
    if(err instanceof Error.ValidationError) {
        next(err.message);
    }

    res.sendStatus(200);
}
