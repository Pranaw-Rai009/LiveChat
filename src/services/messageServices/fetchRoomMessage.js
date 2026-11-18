import ApiError from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js";

export class FetchRoomMessage {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembership = new RoomMembership(prisma)
    }

    async execute(userId, roomId) {
        const isMember = await this.roomMembership.execute(userId, roomId)
        if (!isMember) throw new ApiError(404, "You are not a room member!")
        const messages = await this.prisma.roomMember.findMany({
            where: {
                roomId
            },
            select: {
                roomId: true,
                message: {
                    select: {
                        id: true,
                        content: true,
                        roomMemberId: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })
        if(messages === null) return null
        return messages
    }
}