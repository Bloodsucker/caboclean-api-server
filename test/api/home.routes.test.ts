import supertest = require('supertest');
import Server from '../../src/Server';
import dotenv = require('dotenv');
import DbMemoryHandler from '../DbMemoryHandler';
import { Types } from 'mongoose';
import { HomeModel, NewHomePublicDocument, HomePublicDocument } from '../../src/model/Home';

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
            const newHome: NewHomePublicDocument = {
                domain: 'myHome'
            };

            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send(newHome);
    
            expect(res.status).toEqual(201);
            expect(res.type).toBe('application/json');

            expect(res.body).toHaveProperty('id');
            const savedHome = await HomeModel.findById(res.body.id);
            if(!savedHome) fail();
            expect(res.body).toEqual(savedHome.toJSON());
        });
    
        it('Fails to create a new home if incomplete', async () => {
            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send({
                    // Incomplete
                });
    
            expect(res.status).toEqual(400);
            expect(await HomeModel.countDocuments()).toBe(0);
        });

        it('Fails to create a new home with garbage id', async () => {
            const res = await supertest(server.app)
                .post('/api/v1/homes')
                .send({
                    _id: 'garbage id',
                    domain: 'myHome'
                });
    
            expect(res.status).toEqual(400);
            expect(await HomeModel.countDocuments()).toBe(0);
        });

        it('should ignore a passed valid id', () => {
            fail('TODO decide what should happen'); // TODO
        });
    });

    describe('Home full update: PUT /:homeId', () => {
        const storedHome: NewHomePublicDocument = {
            domain: 'myHome'
        };

        let storedHomeModel: HomePublicDocument;
        
        beforeEach(async () => {
            storedHomeModel = (await new HomeModel(storedHome).save()).toJSON();
        });

        afterEach(async () => {
            await HomeModel.findByIdAndRemove(storedHomeModel.id);
        });

        it('fully updates a home', async () => {
            const updatedHome: HomePublicDocument = {...storedHomeModel};
            updatedHome.domain = "myUpdatedDomain";

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`)
                .send(updatedHome);

            expect(res.status).toBe(200);
        });

        it('fails to update an incomplete home', async () => {
            const updatedHome: HomePublicDocument = {...storedHomeModel};
            delete updatedHome.domain;

            const res = await supertest(server.app)
                .put(`/api/v1/homes/${storedHomeModel.id}`)
                .send(updatedHome);

            expect(res.status).toBe(400);
        });

        it('fails to update a home with garbage id in URL', () => {
            fail('TODO decide what to do.'); // TODO
        });

        it('fails to update a home with inconsistent id', () => {
            fail('TODO decide what to do.'); // TODO
        });
    });

    describe('Home get: GET /homeId', () => {
        const storedHome: NewHomePublicDocument = {
            domain: 'myHome'
        };

        let storedHomeDocument: HomePublicDocument;
        
        beforeEach(async () => {
            storedHomeDocument = (await new HomeModel(storedHome).save()).toJSON();
        });

        afterEach(async () => {
            await HomeModel.findByIdAndRemove(storedHomeDocument.id);
        });

        it('gets a home', async () => {
            const res = await supertest(server.app)
                .get(`/api/v1/homes/${storedHomeDocument.id}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(storedHomeDocument);
        });

        it('fails to get a home that does\'t exist', async () => {
            const notFoundHomeId = new Types.ObjectId();

            const res = await supertest(server.app)
                .get(`/api/v1/homes/${notFoundHomeId}`);

            expect(res.status).toBe(404);
        });

        it('fails to get a home with an garbage id', async () => {
            const garbageId = "garbageId";

            const res = await supertest(server.app)
                .get(`/api/v1/homes/${garbageId}`);

            expect(res.status).toBe(404);
        });
    });
});
