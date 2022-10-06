import Kafka from "node-rdkafka";
import url from "../urls.js";

export const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': url.kafka,
}, {});


consumer.on('connection.failure', function(err) {
    if (err) console.log(err);
    process.exit(1);
});


consumer.on('event.event', function(eventData) {
    console.log(eventData);
});

consumer.on('event.error', function(err) {
    console.log(err);
})

consumer.on('disconnected', function(err) {
    console.log('consumer disconnected');
})





