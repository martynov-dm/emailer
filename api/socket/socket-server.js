import { Server } from "socket.io";
import { JOB_UPDATE_EVENT, jobUpdateEventEmitter } from "../jobs-state/jobs-state.js";

export const createSocketServer = (server) => {
    return new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });
};

export const initSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("A user is connected");

        jobUpdateEventEmitter.on(JOB_UPDATE_EVENT, (update) => {
            socket.emit("update", update);
        })

        socket.on("disconnect", () => {
            console.log(`socket ${socket.id} disconnected`);
        });
    });
};


