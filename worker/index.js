import { consumer } from "./kafka/job-trigger-consumer.js";
import { EMAIL_TRIGGER_TOPIC } from "./topic-names.js";
import { triggerJob } from "./email-worker/email-worker.js";

consumer.connect();

consumer.on('ready', (info, metadata) => {
    console.log('consumer is ready ' + "info: " + JSON.stringify(info))
    consumer.subscribe([EMAIL_TRIGGER_TOPIC]);
    consumer.consume();
}).on('data', function(data) {
    const jobTriggerMessage = data.value.toString()

    console.log('received message ' + jobTriggerMessage)

    triggerJob(JSON.parse(jobTriggerMessage))
});
