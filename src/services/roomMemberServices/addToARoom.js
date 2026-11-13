import ApiError from "../../utils/apiError.util.js";

export class AddToRoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId, roomId, role) {
        const newRoomMember = await this.prisma.roomMember.create({
            data: {
                roomId,
                userId,
                role
            }
        })
        if(!newRoomMember) throw new ApiError(400, "Error occured while adding user to room!")
        return newRoomMember
    }
}