import Home, { HomeI } from "../model/Home";
import HomeNotExistError from "../errors/HomeNotFoundError";
import { Error } from "mongoose";

export default class HomeService {
    public static async getHome(homeId: string): Promise<HomeI | HomeNotExistError>{
        const home = await Home.findById(homeId);
        
        if(!home) return new HomeNotExistError(homeId);
        
        return home;
    }

    public static async createHome(newHomeSpec: object): Promise<HomeI | Error.ValidationError> {
        const newHome = new Home(newHomeSpec);
        
        try {
            await newHome.save();
        } catch(e) {
            if(e instanceof Error.ValidationError) return e;
            throw e;
        }

        return newHome
    }
}
