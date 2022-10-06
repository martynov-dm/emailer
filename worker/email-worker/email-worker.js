import { EventEmitter } from 'events';
import {queueMessage} from "../kafka/job-process-producer.js";

export const JOB_EVENT_NAME = 'email-sent'
export const jobEventEmitter = new EventEmitter();

export const triggerJob = (triggerData) => {
    const numberOfEvents = triggerData.body.number
    let currentNum = 1

    const interval = setInterval(() => {
        jobEventEmitter.emit(JOB_EVENT_NAME, { key: triggerData.key, state: `${currentNum}/${numberOfEvents}` })
        currentNum++
        if (currentNum === numberOfEvents + 1) clearInterval(interval)
    }, 5000)
}

jobEventEmitter.on(JOB_EVENT_NAME,  queueMessage);
