import ApiError from "../../utils/apiError.util.js";
import { RoomExist } from "../roomServices/roomExist.js";


export class JoinRoom {
    constructor(prisma) {
        this.prisma = prisma
        this.checkRoomExist = new RoomExist(prisma)
    }
    async execute(userId, roomId, role) {
        const roomExist = await this.checkRoomExist.execute(roomId)
        if(roomExist === null) throw new ApiError(404, "Invalid Room Id")
        try {
            return await this.prisma.roomMember.create({
                data: {
                    userId,
                    roomId,
                    role
                }
            })
        } catch(err) {
            if(err.code === "P2002") throw new ApiError(409, "You are already a member of this room!")
            throw err
        }
    }
}