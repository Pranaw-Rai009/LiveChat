import express from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true                // ALLOWS COOKIES TO BE SENT AND RECEIVED
}))
app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.json({static: "public"}))

export default app