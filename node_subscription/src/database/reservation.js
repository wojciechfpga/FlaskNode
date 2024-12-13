const dbClient = require('./client');

async function getAllReservations() {
  const result = await dbClient.query('SELECT * FROM reservations');
  return result.rows;
}

async function createReservation(reservation) {
  const { start_time, end_time } = reservation;
  const result = await dbClient.query(
    'INSERT INTO reservations (start_time, end_time) VALUES ($1, $2) RETURNING *',
    [start_time, end_time]
  );
  return result.rows[0];
}

module.exports = {
  getAllReservations,
  createReservation,
};
