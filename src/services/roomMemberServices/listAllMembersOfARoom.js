import ApiError from "../../utils/apiError.util.js"
import { RoomMembership } from "../accessServices/roomMembership.js"
export class ListAllMemberOfARoom {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembershipCheck = new RoomMembership(prisma)
    }

    async execute(roomId, userId) {
        const roomExist = await this.prisma.room.findUnique({
            where: {
                id: roomId
            }
        })
        if(roomExist === null) throw new ApiError(404, "Invalid Room Id!")
        const validRoomMember = await this.roomMembershipCheck.execute(userId, roomId)
        if(validRoomMember === null) throw new ApiError(401, "You are not the room member, can't list members!")
        const allMembers = await this.prisma.roomMember.findMany({
            where: {
                roomId
            },
            select: {
                userId: true,
                roomId: true,
                role: true,
                id: true,
                createdAt: true,
                updatedAt: true,
                leftAt: true
            }
        })
        return allMembers
    }
}