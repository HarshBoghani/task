const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

const app = express();
const port = process.env.PORT || 10000;

app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});