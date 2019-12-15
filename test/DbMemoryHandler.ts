import mongoose = require('mongoose');
import { MongoMemoryServer } from 'mongodb-memory-server';

export default class DbMemoryHandler {
    private readonly mongoMemoryServer: MongoMemoryServer;

    constructor() {
        this.mongoMemoryServer = new MongoMemoryServer();
    }

    async connect(): Promise<void> {
        const uri = await this.mongoMemoryServer.getConnectionString();

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }

    async getConnectionString(): Promise<string> {
        return await this.mongoMemoryServer.getConnectionString();
    }

    async clearDb(): Promise<void> {
        await mongoose.connection.dropDatabase();
    }

    async closeDb(): Promise<void> {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        this.mongoMemoryServer.stop();
    }
}
