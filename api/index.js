import express from 'express'
import cors from 'cors'
import { connectConsumer } from "./kafka/job-status-consuner.js";
import { queueMessage } from "./kafka/email-trigger-producer.js";
import { v4 as uuidv4 } from 'uuid';
import { createSocketServer, initSocketHandlers } from "./socket/socket-server.js";
import { jobsStore } from "./jobs-state/jobs-state.js";
import * as http from "http";

connectConsumer()

const app = express()
const server = http.createServer(app);


const io = createSocketServer(server);
initSocketHandlers(io);
const socketIOMiddleware = (req, res, next) => {
    req.io = io;
    next();
};

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(socketIOMiddleware)

app.get('/api/jobs-status', (req, res) => {
    const state = Array.from(jobsStore.entries()).map(([key, state]) => ({ key, state }))

    res.send(state);
})

app.post('/api/email-submit', async (req, res) => {
    const jobId = uuidv4()

    const jobTriggerMessage = {
        key: jobId,
        body: req.body
    }

    queueMessage(jobTriggerMessage)

    res.status(200).send({
        status: 'job is triggered',
        jobId: jobId
    })
})

server.listen(5002, err => {
    console.log('Listening on port 5002')
})





