import { parse } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';
import { logger } from '../utils/logger';
import internal from 'stream';

// const wss = new WebSocketServer({ port: 7071 });
const clients = new Map();

export async function start(server: http.Server) {
    const wss = new WebSocketServer({ noServer: true, path: '/socket' });

    wss.on('connection', function connection(ws: WebSocket) {
        ws.on('message', function message(data: string) {
            console.log('received: %s', data);
        });

        let counter = 1;
        setInterval(() => {
            ws.send(`Test message from server ${counter++}`);
        }, 2000);
    });

    server.on('upgrade', (request: http.IncomingMessage, socket: internal.Duplex, head: Buffer) => {
        const { pathname } = parse(request.url ?? '');
        logger.warn({ pathname });
        if (pathname === '/socket') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });
}

// wss.on('connection', (ws) => {
//     const id = uuidv4();
//     const color = Math.floor(Math.random() * 360);
//     const metadata = { id, color };

//     clients.set(ws, metadata);
//     ws.on('message', (messageAsString) => {
//         const message = JSON.parse(messageAsString);
//         const metadata = clients.get(ws);

//         message.sender = metadata.id;
//         message.color = metadata.color;
//         const outbound = JSON.stringify(message);

//         [...clients.keys()].forEach((client) => {
//             client.send(outbound);
//         });
//     });
//     ws.on('close', () => {
//         clients.delete(ws);
//     });
// });

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
