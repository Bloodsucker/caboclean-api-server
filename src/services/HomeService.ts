import Home, { HomeI, NewHomePublicModel, HomePublicModel } from "../model/Home";
import HomeNotExistError from "../errors/HomeNotFoundError";
import { Error } from "mongoose";
import HomeNotFoundError from "../errors/HomeNotFoundError";

export default class HomeService {
    public static async getHome(homeId: string): Promise<HomeI | HomeNotExistError>{
        try {
            const home = await Home.findById(homeId);
        
            if(!home) return new HomeNotExistError(homeId);

            return home;
        } catch(e) {
            if(e instanceof Error.CastError) return new HomeNotFoundError(homeId);
            throw e;
        }
    }

    public static async createHome(newHomeSpec: NewHomePublicModel): Promise<HomeI | Error.ValidationError> {
        const newHome = new Home(newHomeSpec);
        
        try {
            await newHome.save();
        } catch(e) {
            if(e instanceof Error.ValidationError) return e;
            throw e;
        }

        return newHome
    }

    public static async putHome(updatedHomeSpec: HomePublicModel): Promise<Error.ValidationError | HomeNotExistError | void> {
        try {
            const home = await HomeService.getHome(updatedHomeSpec.id);

            if(home instanceof HomeNotExistError) return home;
            
            home.overwrite(updatedHomeSpec);

            await home.save();
        } catch(e) {
            if(e instanceof Error.ValidationError) return e;
            if(e instanceof Error.CastError) return new HomeNotFoundError(updatedHomeSpec.id);
            throw e;
        }
    }
}
