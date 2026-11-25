export class RoomAdminCheck {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, adminId) {
        const isAdmin = await this.prisma.roomMember.findUnique({
            where: {
                roomId_userId: {roomId, userId: adminId},
                role: "ADMIN",
                leftAt: null
            }
        })
        if(isAdmin === null) return null
        return isAdmin
    }
} 