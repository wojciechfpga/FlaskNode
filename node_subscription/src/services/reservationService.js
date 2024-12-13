const { createReservation, getAllReservations } = require('../database/reservation');

async function createNewReservation(reservation) {
  // Można dodać walidację danych
  if (!reservation.start_time || !reservation.end_time) {
    throw new Error('Invalid reservation data');
  }
  return createReservation(reservation);
}

module.exports = {
  createNewReservation,
  getAllReservations,
};
