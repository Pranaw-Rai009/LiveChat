// server.js
import { prisma } from './db/dbConnect.js'
import app from './app.js'

const startServer = async function () {
    await prisma.$queryRaw`SELECT 1`
}
    
startServer()
.then(() => {
    console.log("Database Connection Successfull")


    const server = app.listen(process.env.PORT, () => {
        console.log(`The server is listening on port ${process.env.PORT}`)
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


