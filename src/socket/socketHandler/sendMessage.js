import ApiError from "../../utils/apiError.util"
import {RoomMembership} from "../../services/accessServices/roomMembership.js"
import { prisma } from "../../db/dbConnect"

const roomMemberCheck = new RoomMembership(prisma)
export const registerSendMessage = (socket, io) => {
    try{
            socket.emit("sendMessage", async (payload, ack) => {
        const roomId = parseInt(payload?.roomId)
        if (!roomId) throw new ApiError(400, "Room Id is missing!")
        const message = payload?.message
        if (!message) throw new ApiError(400, "Message is missing!")
        const userId = socket.user.id
        const isMember = await roomMemberCheck.execute(userId, roomId)
        if(isMember === null) throw new ApiError(404, "You are not a room member") 
    })
    } catch(err) {
        
    }
}