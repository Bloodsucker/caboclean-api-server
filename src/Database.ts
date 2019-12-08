import {MongoClient} from 'mongodb';

export default class Database {
    private readonly connectionUrl:string;
    public mongoDb:MongoClient;

    constructor(connectionUrl:string) {
        this.connectionUrl = connectionUrl;
        
        // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
        this.mongoDb = new MongoClient(this.connectionUrl, { useUnifiedTopology: true });
    }

    async connect() {
        await this.mongoDb.connect();
    }
}
