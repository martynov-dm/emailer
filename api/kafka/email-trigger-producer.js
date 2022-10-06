import Kafka from "node-rdkafka";
import { EMAIL_TRIGGER_TOPIC } from "./topic-names.js";
import url from "../urls.js";

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': url.kafka
}, {}, {
    topic: EMAIL_TRIGGER_TOPIC
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

export function queueMessage(message) {
    const bodyStr = JSON.stringify(message)
    const success = stream.write(Buffer.from(bodyStr));
    if (success) {
        console.log(`message queued (${bodyStr})`);
    } else {
        console.log('Could not send message');
    }
}
