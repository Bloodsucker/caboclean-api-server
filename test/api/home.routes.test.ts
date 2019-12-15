import supertest = require('supertest');
import Server from '../../src/Server';
import dotenv = require('dotenv');
import DbMemoryHandler from '../DbMemoryHandler';
import { Types } from 'mongoose';
import Home, { NewHomePublicModel, HomeI } from '../../src/model/Home';
import { homedir } from 'os';
import HomeService from '../../src/services/HomeService';

dotenv.config();

let server: Server;
const dbMemoryHandler = new DbMemoryHandler();

beforeAll(async () => {
    const generatedMongoUri = await dbMemoryHandler.getConnectionString();
    process.env['MONGO_URI'] = generatedMongoUri;

    server = new Server();

    await server.start();
});
afterEach(async ()=> {
    await dbMemoryHandler.clearDb();
});
afterAll(async () => {
    await dbMemoryHandler.closeDb();
});

describe('Route: /api/v1/homes', () => {
    describe('Home creation: POST /', () => {
        it('Create new home', async () => {
            const newHome: NewHomePublicModel = {
                domain: 'myHome'
            };

            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send(newHome);
    
            expect(res.status).toEqual(201);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('_id');
            expect(Types.ObjectId.isValid(res.body._id));
            expect(res.body).toMatchObject(newHome);
        });
    
        it('Fails to create a new home if incomplete', async () => {
            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send({
                    // Incomplete
                });
    
            expect(res.status).toEqual(400);
        });

        it('Fails to create a new home with garbage id', async () => {
            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send({
                    _id: 'garbage id',
                    domain: 'myHome'
                });
    
            expect(res.status).toEqual(400);
        });

        it('should ignore a passed valid id', async () => {
            const newHome = {
                _id: new Types.ObjectId()+'',
                domain: "validDomain"
            };

            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send(newHome);
            
            expect(res.status).toEqual(400);
        });
    });

    describe('Home full update: PUT /:homeId', () => {
        const storedHome: NewHomePublicModel = {
            domain: 'myHome'
        };

        let storedHomeModel: HomeI;
        
        beforeEach(async () => {
            storedHomeModel = await new Home(storedHome).save();
        });

        afterEach(async () => {
            await Home.findByIdAndRemove(storedHomeModel._id);
        });

        it('fully updates a home', async () => {
            const updatedHome: NewHomePublicModel = Object.create(storedHome);
            updatedHome.domain = "myUpdatedDomain";

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`)
                .send(updatedHome);

            expect(res.status).toBe(200);
        });

        it('can\'t update an incomplete home', async () => {
            const updatedHome: NewHomePublicModel = Object.create(storedHome);
            delete updatedHome.domain;

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`)
                .send(updatedHome);

            expect(res.status).toBe(400);
        });

        it('fails to update a home with garbage id', async () => {
            const updatedHome: NewHomePublicModel = Object.create(storedHome);
            delete updatedHome.domain;

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`)
                .send(updatedHome);

            expect(res.status).toBe(400);
        });

        it('fails to update a home with inconsistent id', () => {
            expect(false).toBe(true); // TODO. Decide how to behave.
        });
    });

    describe('Home get: GET /homeId', () => {
        const storedHome: NewHomePublicModel = {
            domain: 'myHome'
        };

        let storedHomeModel: HomeI;
        
        beforeEach(async () => {
            storedHomeModel = await new Home(storedHome).save();
        });

        afterEach(async () => {
            await Home.findByIdAndRemove(storedHomeModel._id);
        });

        it('gets a home', async () => {
            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', storedHomeModel.id);
            expect(res.body).toMatchObject(storedHome);
        });

        it('fails to get a home that does\'t exist', async () => {
            const notFoundHomeId = new Types.ObjectId();

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${notFoundHomeId}`);

            expect(res.status).toBe(404);
        });

        it('fails to get a home with an garbage id', async () => {
            const garbageId = "garbageId";

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${garbageId}`);

            expect(res.status).toBe(404);
        });
    });
});
