import Home, { HomeI } from "../model/Home";
import HomeNotExistError from "../errors/HomeNotExistError";

export default class HomeService {
    public static async getHome(domain: string): Promise<HomeI | HomeNotExistError>{
        const home = await Home.findOne({domain: domain});
        
        if(!home) return new HomeNotExistError();
        
        return home;
    }
}
