import ApiError from "../../utils/apiError.util.js"
import {RoomMembership} from "../../services/accessServices/roomMembership.js"
import { SaveMessage } from "../../services/messageServices/saveMessage.js"
import { prisma } from "../../db/dbConnect.js"

const saveMessage = new SaveMessage(prisma)
const roomMembershipCheck = new RoomMembership(prisma)
// export const registerSendMessage = (socket, io) => {
//             socket.on("sendMessage", async (payload, ack) => {
//                  try{
//                 console.log("sendMessage received: ", payload.roomId)
//         const roomId = parseInt(payload.roomId)
//         if (!roomId) throw new ApiError(400, "Room Id is missing!")
//         const message = payload?.message
//         if (!message) throw new ApiError(400, "Message is missing!")
//         if(message.length > 2000) throw new ApiError(400, "Message is too long!")
//         const userId = socket.user.id
//         const isMember = await roomMembershipCheck.execute(userId, roomId)
//         if(isMember === null) throw new ApiError(404, "You are not a room member") 
//         await saveMessage.execute(message, isMember.id)
//         io.to( `room:${roomId}`).emit("newMessage", message)
//         ack?.({success: true})
//     })
//     } catch(err) {
//         if(!err.statusCode) console.log(err)
//         ack?.({
//     success: false,
//     message:  err.statusCode  && err.statusCode < 500 ? err.message : "Internal Server Error"
//     })
//     }
// }

export const registerMessageHandlers = (io, socket) => {
    socket.on("sendMessage", async (payload, ack) => {
        try {
            console.log("sendMessage received:", payload)

            const roomId = parseInt(payload?.roomId)
            if (Number.isNaN(roomId)) throw new ApiError(400, "Room id is missing or invalid!")

            const content = typeof payload?.content === "string" ? payload.content.trim() : ""
            if (!content) throw new ApiError(400, "Message is missing!")
            if (content.length > 2000) throw new ApiError(400, "Message is too long!")

            const membership = await roomMembershipCheck.execute(socket.user.id, roomId)
            if (!membership) throw new ApiError(403, "You are not a member of this room!")
                console.log("hello mesg")
            const message = await saveMessage.execute(content, membership.id)
            io.to(`room:${roomId}`).emit("newMessage", message)
            ack?.({ success: true })
        } catch (err) {
            if (!err.statusCode) console.error(err)
            ack?.({
                success: false,
                message: err.statusCode && err.statusCode < 500 ? err.message : "Internal Server Error",
            })
        }
    })
}