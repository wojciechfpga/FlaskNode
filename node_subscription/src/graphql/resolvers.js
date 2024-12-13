const { pubsub, NEW_RESERVATION } = require('../events/eventListeners');
const { getReservations } = require('../services/reservationService');

const resolvers = {
  Query: {
    reservations: async () => await getReservations(),
  },
  Subscription: {
    newReservation: {
      subscribe: () => pubsub.asyncIterator([NEW_RESERVATION]),
    },
  },
};

module.exports = resolvers;
