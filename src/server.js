// server.js
import { prisma } from './db/dbConnect.js'
import app from './app.js'

const startServer = async function () {
    await prisma.$queryRaw`SELECT 1`
}
    
startServer()
.then(() => {
    console.log("Database Connection Successfull")

    app.on("error", (error) => {
        console.log("Error occured in connection!")
        process.exit(1)
    })

    app.listen(process.env.PORT, () => {
        console.log(`The server is listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Database connection failed: ", err)
})


