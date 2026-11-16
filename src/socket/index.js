import { Server, Socket } from 'socket.io'
import httpServer from '../app'

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: process.env.CORS_ORIGIN, credentials: true}
    })

    io.on("connection", (socket) => {
        console.log("Connected: ", socket.id)

        socket.on("disconnect", () => {
            console.log("Disconnected: ", socket.id)
        })
    })
    return io
}