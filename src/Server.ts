import express = require('express');
import api from './api';
import Database from './Database'
import { Application } from './util/serverTypes';

const SERVER_API_PORT_ENV = "SERVER_API_PORT";

export default class Server {
    public readonly app: Application;

    public readonly db: Database;

    constructor() {
        this.app = express();

        this.db = new Database();
        this.app.locals.db = this.db;

        this.app.use('/api/v1', api);
    }

    async start(): Promise<void> {
        await this.db.connect();

        return new Promise((resolve) => {
            this.app.listen(process.env[SERVER_API_PORT_ENV], resolve);
        });
    }
}
