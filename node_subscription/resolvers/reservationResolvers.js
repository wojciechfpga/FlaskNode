const pubsub = require('../pubsub');
const NEW_RESERVATION = 'NEW_RESERVATION';

const reservationResolvers = {
  Query: {
    reservations: async () => {
      // Logika do pobierania rezerwacji z bazy danych
    },
  },
  Subscription: {
    newReservation: {
      subscribe: () => pubsub.asyncIterator([NEW_RESERVATION]),
    },
  },
};

module.exports = reservationResolvers;
