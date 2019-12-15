import Server from './Server';
import dotenv = require('dotenv');

dotenv.config();

const server = new Server();

server.start().then(() => {
    console.log( `Server is connected to DB and started at http://localhost:${ process.env['SERVER_API_PORT'] }` );
});