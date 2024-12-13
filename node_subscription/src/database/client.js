const { Client } = require('pg');

// Konfiguracja klienta PostgreSQL
const dbClient = new Client({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'conference',
});

// Połącz się z bazą danych
dbClient.connect().catch((err) => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});

// Eksport klienta
module.exports = dbClient;
