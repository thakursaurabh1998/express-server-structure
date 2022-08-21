import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:4000/socket');

ws.on('open', () => {
    let counter = 1;
    setInterval(() => {
        ws.send(`Test message from client ${counter++}`);
    }, 1000);
});

ws.on('message', (msg: string) => {
    console.log(`received message: ${msg}`);
});
