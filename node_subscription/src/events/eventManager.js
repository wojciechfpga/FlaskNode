const WebSocket = require('ws');
const dbClient = require("../database/client");
const { createNewReservation } = require('../services/reservationService');

const connections = [];

// Funkcja do przesyłania wiadomości do wszystkich połączonych klientów
function broadcast(event, data) {
  connections.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event, data }));
    }
  });
}

// Funkcja do nasłuchiwania na trigger z bazy danych
function setupDatabaseListener() {
  dbClient.query('LISTEN new_reservation');

  dbClient.on('notification', (msg) => {
    const payload = JSON.parse(msg.payload);
    console.log('New reservation from database:', payload);
    broadcast('NEW_RESERVATION', payload);
  });
}

// Funkcja do konfiguracji WebSocket
function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    connections.push(ws);

    ws.on('message', async (message) => {
      const { event, data } = JSON.parse(message);

      if (event === 'NEW_RESERVATION') {
        try {
          const reservation = await createNewReservation(data);
          broadcast('NEW_RESERVATION', reservation);
        } catch (error) {
          ws.send(JSON.stringify({ event: 'ERROR', data: error.message }));
        }
      }
    });

    ws.on('close', () => {
      const index = connections.indexOf(ws);
      if (index > -1) connections.splice(index, 1);
    });
  });

  // Uruchomienie nasłuchiwania na zdarzenia z bazy danych
  setupDatabaseListener();
}

module.exports = setupWebSocket;
