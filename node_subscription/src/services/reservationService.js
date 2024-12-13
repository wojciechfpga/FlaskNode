const dbClient = require('../database/dbClient');

const getReservations = async () => {
  const result = await dbClient.query('SELECT * FROM reservations');
  return result.rows;
};

module.exports = {
  getReservations,
};
