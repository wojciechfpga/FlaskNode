const { Client } = require('pg');

const dbClient = new Client({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'conference',
});

dbClient.connect();
dbClient.query('LISTEN new_reservation');

module.exports = dbClient;
