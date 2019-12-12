import mongoose = require('mongoose');

export default class Database {
    private readonly host: string;
    private readonly port: number;

    private static readonly DB_NAME = 'caboclean'; 

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    async connect(): Promise<void> {
        const connectionUrl = `mongodb://${this.host}:${this.port}/${Database.DB_NAME}`;

        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
