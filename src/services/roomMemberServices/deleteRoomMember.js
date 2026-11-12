import ApiError from "../../utils/apiError.util.js";

export class DeleteRoomMember {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId, roomId) {
        const deleted = await this.prisma.roomMember.delete({
            where: {
                userId,
                roomId: parseInt(roomId)
            }
        })
        if(!deleted) throw new ApiError(500, "Error occrued while deleting the user!")
        return true
    }
}