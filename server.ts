import WebSocket from 'ws';
import path from 'node:path';
import http from 'node:http';
import express from "express";

const port = 3000;
const app = express();
const server = http.createServer(app);
const ws_server = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

ws_server.on('connection', (ws:WebSocket) => {
  ws.on('error', (error) => console.log(error));
  console.log('OPEN - Server WebSocket - Online');

  ws.on('close', () => {
    console.log('CLOSED - Server WebSocket - Offline');
  })
});


