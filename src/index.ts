import Server from './Server';

const SERVER_PORT = 8080;

const server = new Server(SERVER_PORT);

server.start().then(() => {
    console.log( `Server is connected to DB and started at http://localhost:${ SERVER_PORT }` );
});