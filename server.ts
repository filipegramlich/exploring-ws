import WebSocket from 'ws';
import fs from 'fs';
import path from 'node:path';
import http from 'node:http';

const server = http.createServer((req, res)=>{
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading style.css');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  }
  else if (req.url === '/script.js') {
    fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading script.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running!');
});

const ws_server = new WebSocket.Server({ server });

ws_server.on('connection', (ws: WebSocket) => {
  ws.on('message', (data) => {
    ws_server.clients.forEach((client) => {
      if(client !== ws && client.readyState === WebSocket.OPEN) {
        const new_list_item = data.toString('utf-8');
        client.send(new_list_item);
      }
    })
  });

  ws.on('close', () => {
    console.log('User Offline - server message');
  });
});