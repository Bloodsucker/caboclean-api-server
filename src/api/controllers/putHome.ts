import { Request, Response } from "../../util/serverTypes";
import HomeService from "../../services/HomeService";
import { GetHomeParams } from "../routers";
import { HomePublicDocument } from "../../model/Home";
import { Error } from "mongoose";
import { NextFunction } from "express";

export async function putHome(req: Request<GetHomeParams, HomePublicDocument>, res: Response, next: NextFunction): Promise<void> {
    const err = await HomeService.putHome(req.body);
    
    if(err instanceof Error.ValidationError) {
        res.status(400);
        next(err.message);
        return;
    }

    res.sendStatus(200);
}
