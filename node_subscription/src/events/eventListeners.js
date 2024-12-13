const { PubSub } = require('graphql-subscriptions');
const dbClient = require('../database/dbClient');

const pubsub = new PubSub();
const NEW_RESERVATION = 'NEW_RESERVATION';

dbClient.query('LISTEN new_reservation');
dbClient.on('notification', (msg) => {
    console.log("NEW RESERVATUIb")
    console.log(msg)
    const payload = JSON.parse(msg.payload);
    pubsub.publish(NEW_RESERVATION, { newReservation: payload });
});

module.exports = {
    pubsub,
    NEW_RESERVATION,
};
