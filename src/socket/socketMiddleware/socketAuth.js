import jwt from 'jsonwebtoken'
export const socketAuth = (socket, next) => {
    const token = socket.handshake.auth?.token
    if(!token) return next(new Error("Access Token Missin For Socket Authentication!"))
    
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(payload)
        socket.user = {id: payload.id}
        next()
    } catch(err) {
        next(new Error ("Invalid or expired token"))
    }
}