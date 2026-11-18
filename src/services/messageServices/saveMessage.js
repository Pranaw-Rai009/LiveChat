// import ms from "ms";
import ApiError from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js";

export class SaveMessage {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembershipCheck = new RoomMembership(prisma)
    }

    
    async execute(msg, roomId, userId) {
        const member = await this.roomMembershipCheck.execute(userId, roomId)
        if(member === null) throw new ApiError(404, "You are not a room member")
        const newMsg = await this.prisma.message.create({
            data: {
                content: msg,
                roomMemberId: member.id
            }
        })
        return newMsg
    }
}