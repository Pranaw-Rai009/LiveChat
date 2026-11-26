export class SaveMessage {
    constructor(prisma) {
        this.prisma = prisma
    }


    async execute(msg, roomMemberId) {
        const newMsg = await this.prisma.message.create({
            data: {
                content: msg,
                roomMemberId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                roomMember: {
                    select: {
                        id: true,
                        roomId: true,
                        user: {
                            select: { id: true, userName: true, profilePic: true }
                        }
                    }
                }
            }
        })
        return newMsg
    }
}