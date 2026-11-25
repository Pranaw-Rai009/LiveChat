import { prisma } from "../../db/dbConnect.js"
import { RoomMembership } from "../../services/accessServices/roomMembership.js"
import ApiError from "../../utils/apiError.util.js"

const roomMemberCheck = new RoomMembership(prisma)

export const registerRoomHandlers = (io, socket) => {
    socket.on("joinRoom", async (payload, ack) => {
        try {
            const roomId = parseInt(payload?.roomId)
            if (Number.isNaN(roomId)) throw new ApiError(400, "room Id is missing!")
            const userId = socket.user.id
            const membership = await roomMemberCheck.execute(userId, roomId)
            if (membership === null) throw new ApiError(403, "You are not a member of this room!")

            socket.join(`room:${roomId}`)
            ack?.({ success: true ,
                message: "Room Joined"
            })
        } catch (err) {
            if (!err.statusCode) console.log(err)
            ack?.({
                success: false,
                message: err.statusCode && err.statusCode < 500 ? err.message : "Internal server error"
            })
        }
    })
}