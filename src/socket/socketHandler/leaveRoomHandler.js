import { prisma } from "../../db/dbConnect.js"
import {RoomMembership} from "../../services/accessServices/roomMembership.js"
// import ApiError from "../../utils/apiError.util.js"
import { LeaveRoom } from "../../services/roomMemberServices/leaveRoom.js"
import { RoomExist } from "../../services/roomServices/roomExist.js"

const roomExistCheck = new RoomExist(prisma)
const leaveRoom = new LeaveRoom(prisma)
export const registerLeaveHandlers =  (io, socket) =>  {
    socket.on("leaveRoom", async (payload, ack) => {
        try {
            const roomId = payload.roomId
            const roomCheck = await roomExistCheck.execute(roomId)
            await leaveRoom.execute(socket.user.id, roomId)
           socket.leave(`room:${roomId}`)
           ack?.({
            success: true
           })
        } catch(err) {
            if(!err.statusCode) console.log(err)
                ack?.({
            success: false,
            message: err.statusCode && err.statusCode < 500 ? err.message : "Internal server error !"
            })
        }
    })
}