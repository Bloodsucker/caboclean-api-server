import express = require('express');
import api from './api';

export default class Server {
    private serverStartListeners:Array<ServerStartListener>;
    private app:express.Express;
    private readonly port: number;

    constructor(port:number) {
        this.serverStartListeners = [];
        this.app = express();
        this.port = port;

        this.app.use('/api/v1', api);
    }

    addServerStartListener(listener:ServerStartListener) {
        this.serverStartListeners.push(listener);
    }

    listen() {
        this.app.listen(this.port, () => {
            for(const listener of this.serverStartListeners) {
                listener();
            }
        });
    }
}

export interface ServerStartListener { ():void };
