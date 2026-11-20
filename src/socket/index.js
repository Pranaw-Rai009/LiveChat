import { Server } from 'socket.io'
import httpServer from '../app.js'
import { socketAuth } from './socketMiddleware/socketAuth.js'
import { registerRoomHandlers } from './socketHandler/roomHandler.js'
import {registerMessageHandlers} from './socketHandler/sendMessage.js'
import { registerLeaveHandlers } from './socketHandler/leaveRoomHandler.js'

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: process.env.CORS_ORIGIN, credentials: true}
    })

    io.use(socketAuth)  //runs for every client that tries to connect
    io.on("connection", (socket) => {
        console.log("Connected: ", socket.id)

        registerRoomHandlers(io, socket)
        registerMessageHandlers(io, socket)
        registerLeaveHandlers(io, socket)

        socket.on("disconnect", () => {
            console.log("Disconnected: ", socket.id)
        })
    })
    return io
}