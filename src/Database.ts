import mongoose = require('mongoose');

const MONGO_URI_ENV = "MONGO_URI";

export default class Database {
    async connect(): Promise<void> {
        const connectionUrl =  process.env[MONGO_URI_ENV] as string;

        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
