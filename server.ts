import WebSocket from 'ws';
import fs from 'fs'
import path from 'node:path'
import http from 'node:http';

const PORT = 3000;
const server = http.createServer((req, res)=>{
  if (req.url === '/') {
    res.end('home');
  }

  if (req.url === '/chat') {
    fs.readFile(path.join(__dirname, 'chat.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log('Server is running!');
});

// const ws_server = new WebSocket.Server({ server });
// ws_server.on('connection', (ws: WebSocket) => {
//   console.log('Novo cliente conectado server');

//   ws.on('close', () => {
//     console.log('Cliente desconectado server');
//   });
// });

console.log('Servidor WebSocket iniciado na porta 3000');
