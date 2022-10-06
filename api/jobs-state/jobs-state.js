import { EventEmitter } from 'events';

export const JOB_UPDATE_EVENT = 'JOB_UPDATE_EVENT'
export const jobUpdateEventEmitter = new EventEmitter();

export const jobsStore = new Map()

export const updateState = (update) => {
    jobsStore.set(update.key, update.state)

    jobUpdateEventEmitter.emit(JOB_UPDATE_EVENT, update)
}
