import app from "../../app.js";
import ApiError from "../../utils/apiError.util.js";

export class RoomAdminCheck {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, adminId) {
        const isAdmin = await this.prisma.roomMember.findnique({
            where: {
                roomId_userId: {roomId, userId: adminId},
                role: "ADMIN"
            }
        })
        if(isAdmin === null) return null
        return isAdmin
    }
}