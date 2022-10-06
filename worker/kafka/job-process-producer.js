import Kafka from 'node-rdkafka';
import { EMAIL_PROCESS_TOPIC } from "../topic-names.js";
import url from "../urls.js";

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': url.kafka
}, {}, {
    topic: EMAIL_PROCESS_TOPIC
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

export function queueMessage(message) {
    const jobStatusMessage = JSON.stringify(message)

    const success = stream.write(Buffer.from(jobStatusMessage));
    if (success) {
        console.log(`message queued (${jobStatusMessage})`);
    } else {
        console.log('Could not send message');
    }
}
