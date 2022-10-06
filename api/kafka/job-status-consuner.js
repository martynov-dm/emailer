import Kafka from "node-rdkafka";
import { EMAIL_PROCESS_TOPIC } from "./topic-names.js";
import { updateState } from "../jobs-state/jobs-state.js";
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

consumer.on('ready', (info) => {
    console.log('consumer is ready ' + "info: " + JSON.stringify(info))
    consumer.subscribe([EMAIL_PROCESS_TOPIC]);
    consumer.consume();
}).on('data', function(data) {
    const stateStr = data.value.toString()
    const state  = JSON.parse(stateStr)

    console.log('received job state ' + stateStr)

    updateState(state)
});

export const connectConsumer = () => {
    if (consumer.isConnected()) return

    consumer.connect();
}



