import Server from './Server';

const SERVER_PORT = 8080;

const server = new Server(SERVER_PORT);
server.addServerStartListener(() => {
    console.log( `server started at http://localhost:${ SERVER_PORT }` );
});

server.listen();
