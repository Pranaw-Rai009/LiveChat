import { use } from "react"
import { prisma } from "../db/dbConnect.js"
import { RoomMemberCheck } from "../services/accessServices/isRoomMember.js"
import ApiError from "../utils/apiError.util.js"

const roomMemberCheck = new RoomMemberCheck(prisma)
// export const roomHandler = async (payload, ack) => {
//     const roomId = parseInt(payload.roomId)
//     if(!roomId) return (new Error("Room id is missin!"))

//     try {
//         const isRoomMember = await roomMemberCheck.execute(roomId, socket.user.id)
//         if(isRoomMember === null) throw new Error(404, "Not A Room Member")
//         socket.join(`room:${roomId}`)
//     } catch(err) {
//         throw new Error(err)
//     }
// }

export const registerRoomHandlers = (io, socket) => {
    socket.on("joinRoom", async (payload, ack) => {
        try {
            const roomId = parseInt(payload?.roomId)
            if (Number.isNaN(roomId)) throw new ApiError(400, "room Id is missing!")
            const userId = socket.user.id
            console.log(userId)
            const membership = await roomMemberCheck.execute(roomId, socket.user.id)
            if (membership === null) throw new ApiError(403, "You are not a member of this room!")

            socket.join(`room:${roomId}`)
            ack?.({ success: true })
        } catch (err) {
            if (!err.statusCode) console.log(err)
            ack?.({
                success: false,
                message: err.statusCode < 500 ? err.message : "Internal server error"
            })
        }
    })
}