const { gql } = require('apollo-server');

const reservationSchema = gql`
  type Reservation {
    id: ID!
    start_time: String!
    end_time: String!
  }

  type Query {
    reservations: [Reservation!]
  }

  type Subscription {
    newReservation: Reservation
  }
`;

module.exports = reservationSchema;
