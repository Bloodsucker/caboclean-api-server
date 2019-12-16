import { NewHomePublicDocument, HomePublicDocument, HomeModel } from "../model/Home";
import HomeNotExistError from "../errors/HomeNotFoundError";
import { Error } from "mongoose";
import HomeNotFoundError from "../errors/HomeNotFoundError";

export default class HomeService {
    public static async getHome(homeId: string): Promise<HomePublicDocument | HomeNotExistError>{
        try {
            const home = await HomeModel.findById(homeId);
        
            if(!home) return new HomeNotExistError(homeId);

            return home.toJSON();
        } catch(e) {
            if(e instanceof Error.CastError) return new HomeNotFoundError(homeId);
            throw e;
        }
    }

    public static async createHome(newHomeSpec: NewHomePublicDocument): Promise<HomePublicDocument | Error.ValidationError> {
        const newHome = new HomeModel(newHomeSpec);
        
        try {
            await newHome.save();
        } catch(e) {
            if(e instanceof Error.ValidationError) return e;
            throw e;
        }

        return newHome.toJSON();
    }

    public static async putHome(updatedHomeSpec: HomePublicDocument): Promise<Error.ValidationError | HomeNotExistError | void> {
        try {
            const home = await HomeModel.findById(updatedHomeSpec.id);

            if(!home) return new HomeNotExistError(updatedHomeSpec.id);
            
            home.overwrite(updatedHomeSpec);
            await home.save();
        } catch(e) {
            if(e instanceof Error.ValidationError) return e;
            if(e instanceof Error.CastError) return new HomeNotFoundError(updatedHomeSpec.id);
            throw e;
        }
    }
}
