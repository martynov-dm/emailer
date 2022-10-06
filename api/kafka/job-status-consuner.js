import Kafka from "node-rdkafka";
import {EMAIL_PROCESS_TOPIC, EMAIL_TRIGGER_TOPIC} from "./topic-names.js";
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
    // const stateStr = data.value.toString()
    // const state  = JSON.parse(stateStr)

    console.log('received job state ' + data)

    // updateState(state)
});

export const connectConsumer = () => {
    if (consumer.isConnected()) return

    const stream = Kafka.Producer.createWriteStream({
        'metadata.broker.list': url.kafka
    }, {}, {
        topic: EMAIL_PROCESS_TOPIC
    });

    stream.on('error', (err) => {
        console.error('Error in our kafka stream');
        console.error(err);
    });

    setInterval(() => {
        const success = stream.write(Buffer.from('test'));
        if (success) {
            console.log(`message queued (test)`);
        } else {
            console.log('Could not send message');
        }
    }, 1000)


    consumer.connect();
}



