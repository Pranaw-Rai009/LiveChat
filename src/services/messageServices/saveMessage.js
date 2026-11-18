// import ms from "ms";
import ApiError from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js";

export class SaveMessage {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembershipCheck = new RoomMembership(prisma)
    }

    
    async execute(msg, roomMemberId) {
        // sendMessage socket handler checks it so , we dont need it here
        // const member = await this.roomMembershipCheck.execute(userId, roomId)
        // if(member === null) throw new ApiError(404, "You are not a room member")
        const newMsg = await this.prisma.message.create({
            data: {
                content: msg,
                roomMemberId
            }
        })
        return newMsg
    }
}