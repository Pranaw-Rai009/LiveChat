export class RoomMemberCheck {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, userId) {
        const isMember = await this.prisma.roomMember.findUnique({
            where: {
                roomId_userId: {roomId, userId},
                role: "MEMBER",
                leftAt: null
            }
        })
        if(isMember === null) return null
        return isMember
    }
}