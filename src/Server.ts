import express = require('express');
import api from './api';
import Database from './Database'

export default class Server {
    private app:express.Express;
    private readonly port: number;

    public readonly db:Database;

    constructor(port:number) {
        this.app = express();
        this.port = port;

        this.db = new Database('mongodb://localhost:27017');
        this.app.locals.db = this.db;

        this.app.use('/api/v1', api);
    }

    async start() {
        await this.db.connect();

        return new Promise((resolve, reject) => {
            this.app.listen(resolve);
        });
    }
}
