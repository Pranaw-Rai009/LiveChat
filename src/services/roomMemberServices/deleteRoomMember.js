import ApiError from "../../utils/apiError.util.js";

export class DeleteRoomMember {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        const deleted = await this.prisma.roomMember.delete({
            where: {
                userId
            }
        })
        if(!deleted) throw new ApiError(500, "Error occrued while deleting the user!")
        return true
    }
}