// import ms from "ms";
import ApiError from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js";

export class SaveMessage {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembershipCheck = new RoomMembership(prisma)
    }

    
    async execute(msg, roomMemberId) {
        const newMsg = await this.prisma.message.create({
            data: {
                content: msg,
                roomMemberId
            }
        })
        return newMsg
    }
}