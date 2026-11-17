// server.js
import { prisma } from './db/dbConnect.js'
import httpServer from './app.js'
import { initSocket } from './socket/index.js'
import { socketAuth } from './socket/socketMiddleware/socketAuth.js'
const startServer = async function () {
    await prisma.$queryRaw`SELECT 1`
}
    
startServer()
.then(() => {
    console.log("Database Connection Successfull")

    initSocket(httpServer)
    const server =  httpServer.listen(process.env.PORT, () => {
        console.log(`The server is listening on http://localhost:${process.env.PORT}`)
    })

    // to catch port binding error
    server.on("error", (error) => {
        console.error("Server Failed to start:", error)

        process.exit(1)
    })
})
.catch((err) => {
    console.log("Database connection failed: ", err)
})


