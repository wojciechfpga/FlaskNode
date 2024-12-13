const http = require('http');
const setupWebSocket = require('../events/eventManager');

function startServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(404);
    res.end('Not Found');
  });

  setupWebSocket(server);

  server.listen(4000, () => {
    console.log('🚀 Server is running on port 4000');
  });
}

module.exports = startServer;
