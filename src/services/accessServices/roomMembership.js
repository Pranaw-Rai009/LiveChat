// import ApiError from "../../utils/apiError.util,js";

export class RoomMembership {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId, roomId) {
        const membership = await this.prisma.roomMember.findUnique({
            where : {
                roomId_userId: {roomId, userId},
                // leftAt: null
            }
        })  
        // if(membership.leftAt !== null) return false
        return membership
    }
}