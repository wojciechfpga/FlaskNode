const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const { Client } = require('pg');

const pubsub = new PubSub();
const NEW_RESERVATION = 'NEW_RESERVATION';

// Połączenie z PostgreSQL
const dbClient = new Client({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'conference',
});

// Połącz się z bazą danych
dbClient.connect();

// Nasłuchuj zdarzeń z PostgreSQL
dbClient.query('LISTEN new_reservation');
dbClient.on('notification', (msg) => {
  console.log("New Reservation")
  console.log(msg)
  const payload = JSON.parse(msg.payload);
  pubsub.publish(NEW_RESERVATION, { newReservation: payload });
});

const typeDefs = gql`
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

const resolvers = {
  Query: {
    reservations: () => [], // Możesz dodać logikę do pobierania rezerwacji z bazy
  },
  Subscription: {
    newReservation: {
      subscribe: () => pubsub.asyncIterator([NEW_RESERVATION]),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Subscriptions ready at ${url}`);
});
