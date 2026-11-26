import jwt from 'jsonwebtoken'
export const socketAuth = (socket, next) => {
    const token = socket.handshake.auth?.token
    if(!token) return next(new Error("Access Token Missin For Socket Authentication!"))
    
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        socket.user = {id: payload.id}
        next()
    } catch(err) {
        next(new Error (401, "Invalid or expired token"))
    }
}