import DbMemoryHandler from "../DbMemoryHandler";
import HomeService from "../../src/services/HomeService";
import Home, { NewHomePublicModel, HomePublicModel } from "../../src/model/Home";
import { Model, Error } from "mongoose";
import HomeNotFoundError from "../../src/errors/HomeNotFoundError";

const dbHandler = new DbMemoryHandler();

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDb());
afterAll(async () => await dbHandler.closeDb());

describe('Creating new Homes', () => {
    it('creates a new home', async () => {
        const newHomeSpec: NewHomePublicModel = {
            domain: 'myNewHome'
        };
        
        const newHome = await HomeService.createHome(newHomeSpec);

        expect(newHome).toBeInstanceOf(Model);
    });

    it('can\'t create invalid homes', async () => {
        const invalidHomeSpec: object = {};

        const newHome = await HomeService.createHome(invalidHomeSpec as NewHomePublicModel);

        expect(newHome).toBeInstanceOf(Error.ValidationError);
    });

    it('creates new homes but without saving extra properties', async () => {
        const newHomeSpec: object = {
            domain: 'myNewHome',
            ignoredProperty: "Ignored property"
        };
        
        const newHome = await HomeService.createHome(newHomeSpec as NewHomePublicModel);

        expect(newHome).toBeInstanceOf(Model);
        expect(newHome).not.toHaveProperty('ignoredProperty');
    });
});

describe('Updating homes', () => {
    const newHomeSpec: NewHomePublicModel = {
        domain: 'newHomeSpec'
    };

    let existingHomeId: string;

    beforeEach(async () => {
        const newHome = new Home(newHomeSpec);
        await newHome.save();

        existingHomeId = newHome.id;
    });

    afterEach(async () => {
        await Home.findByIdAndRemove(existingHomeId);
    });

    it('updates a existing home', async () => {
        const updatedHomeSpec: HomePublicModel = {
            id: existingHomeId,
            domain: 'aDomain2'
        };

        const err = await HomeService.putHome(updatedHomeSpec);
        
        expect(err).toBeUndefined();

        const updatedHome = await Home.findById(existingHomeId);
        expect(updatedHome).toMatchObject(updatedHomeSpec);
    });

    it('cant update a non existing home with an ilegal Id', async () => {
        const updatedHomeSpec: HomePublicModel = {
            id: 'ilegalId',
            domain: 'aDomain'
        };

        const err = await HomeService.putHome(updatedHomeSpec);

        expect(err).toBeInstanceOf(HomeNotFoundError);

        expect(await Home.countDocuments()).toBe(1);
    });

    it('can\'t do partial updates', async () => {
        const updatedHomeSpec: object = {
            id: existingHomeId
        };

        const err = await HomeService.putHome(updatedHomeSpec as HomePublicModel);
        
        expect(err).toBeInstanceOf(Error.ValidationError);
        const home = await Home.findById(existingHomeId);
        expect(home).toHaveProperty('domain', newHomeSpec.domain);
    });
});

describe('Getting new homes', () => {
    const newHomeSpec: NewHomePublicModel = {
        domain: 'newHomeSpec'
    };

    let existingHomeId: string;

    beforeEach(async () => {
        const newHome = new Home(newHomeSpec);
        await newHome.save();

        existingHomeId = newHome.id;
    });

    afterEach(async () => {
        await Home.findByIdAndRemove(existingHomeId);
    });

    it('get an existing home', async () => {
        const foundHome = await HomeService.getHome(existingHomeId);
        expect(foundHome).toMatchObject(newHomeSpec);
    });

    it('don\' get home with an invalid Id', async () => {
        const foundHome = await HomeService.getHome('invalidId');
        expect(foundHome).toBeInstanceOf(HomeNotFoundError);
    });
});
