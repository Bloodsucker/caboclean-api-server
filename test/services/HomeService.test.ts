import DbMemoryHandler from "../DbMemoryHandler";
import HomeService from "../../src/services/HomeService";
import { NewHomePublicDocument, HomePublicDocument, HomeModel } from "../../src/model/Home";
import { Error, Types } from "mongoose";
import HomeNotFoundError from "../../src/errors/HomeNotFoundError";

const dbHandler = new DbMemoryHandler();

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDb());
afterAll(async () => await dbHandler.closeDb());

describe('Creating new Homes', () => {
    it('creates a new home', async () => {
        const newHomeSpec: NewHomePublicDocument = {
            domain: 'myNewHome'
        };
        
        const newHome = await HomeService.createHome(newHomeSpec);
        if(newHome instanceof Error.ValidationError) fail();
        
        const home = await HomeModel.findById(newHome.id); 
        if(!home) fail();
        expect(newHome).toEqual(home.toJSON());
    });

    it('can\'t create invalid homes', async () => {
        const invalidHomeSpec: Partial<NewHomePublicDocument> = {};

        const newHome = await HomeService.createHome(invalidHomeSpec as NewHomePublicDocument);

        expect(newHome).toBeInstanceOf(Error.ValidationError);
    });

    it('creates new homes but without saving extra properties', async () => {
        const newHomeSpec: NewHomePublicDocument & {[key: string]: string} = {
            domain: 'myNewHome',
            ignoredProperty: "Ignored property"
        };
        
        const newHome = await HomeService.createHome(newHomeSpec);
        if(newHome instanceof Error.ValidationError) fail();
        
        const home = await HomeModel.findById(newHome.id); 
        if(!home) fail();
        expect(newHome).toEqual(home.toJSON());
        expect(newHome).not.toHaveProperty('ignoredProperty');
    });
});

describe('Updating homes', () => {
    const newHomeSpec: NewHomePublicDocument = {
        domain: 'newHomeSpec'
    };

    let existingHomeId: string;

    beforeEach(async () => {
        const newHome = new HomeModel(newHomeSpec);
        await newHome.save();

        existingHomeId = newHome.id;
    });

    afterEach(async () => {
        await HomeModel.findByIdAndRemove(existingHomeId);
    });

    it('updates a existing home', async () => {
        const updatedHomeSpec: HomePublicDocument = {
            id: existingHomeId,
            domain: 'aDomain2'
        };

        const err = await HomeService.putHome(updatedHomeSpec);
        
        expect(err).toBeUndefined();

        const updatedHome = await HomeModel.findById(existingHomeId);
        if(!updatedHome) fail();
        expect(updatedHome).toMatchObject(updatedHomeSpec);
    });

    it('fails to update a non existing home with an ilegal Id', async () => {
        const updatedHomeSpec: HomePublicDocument = {
            id: 'ilegalId',
            domain: 'aDomain'
        };

        const err = await HomeService.putHome(updatedHomeSpec);

        expect(err).toBeInstanceOf(HomeNotFoundError);

        expect(await HomeModel.countDocuments()).toBe(1);
    });

    it('fails to do partial updates', async () => {
        const updatedHomeSpec: Partial<HomePublicDocument> = {
            id: existingHomeId
        };

        const err = await HomeService.putHome(updatedHomeSpec as HomePublicDocument);
        
        expect(err).toBeInstanceOf(Error.ValidationError);

        const home = await HomeModel.findById(existingHomeId);
        if(!home) fail();
        expect(home.toJSON()).toMatchObject(newHomeSpec);
    });
});

describe('Getting new homes', () => {
    const newHomeSpec: NewHomePublicDocument = {
        domain: 'newHomeSpec'
    };

    let existingHomeId: string;

    beforeEach(async () => {
        const newHome = new HomeModel(newHomeSpec);
        await newHome.save();

        existingHomeId = newHome.id;
    });

    afterEach(async () => {
        await HomeModel.findByIdAndRemove(existingHomeId);
    });

    it('get an existing home', async () => {
        const foundHome = await HomeService.getHome(existingHomeId);
        expect(foundHome).toMatchObject(newHomeSpec);
    });

    it('fails to get an unexisting home with a valid Id', async () => {
        const foundHome = await HomeService.getHome(new Types.ObjectId().toHexString());
        expect(foundHome).toBeInstanceOf(HomeNotFoundError);
    });

    it('fails to get a home with a garbage Id', async () => {
        const foundHome = await HomeService.getHome('invalidId');
        expect(foundHome).toBeInstanceOf(HomeNotFoundError);
    });
});
