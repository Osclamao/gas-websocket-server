const http = require('http');
const WebSocket = require('ws');

// Standard HTTP server to satisfy Render's port requirement
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket Hub Running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected. Total clients:', wss.clients.size);

  ws.on('message', (data) => {
    const messageString = data.toString();
    console.log('Message received:', messageString);
    console.log('Broadcasting to', wss.clients.size, 'clients');

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected. Total clients:', wss.clients.size);
  });

  ws.on('error', (err) => {
    console.error('WS Error:', err);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WebSocket Hub running on port ${PORT}`));
