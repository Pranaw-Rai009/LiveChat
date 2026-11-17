import { Server } from 'socket.io'
import httpServer from '../app.js'
import { socketAuth } from './socketMiddleware/socketAuth.js'

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: process.env.CORS_ORIGIN, credentials: true}
    })

    io.use(socketAuth)  //runs for every client that tries to connect
    io.on("connection", (socket) => {
        console.log("Connected: ", socket.id)

        socket.on("disconnect", () => {
            console.log("Disconnected: ", socket.id)
        })
    })
    return io
}