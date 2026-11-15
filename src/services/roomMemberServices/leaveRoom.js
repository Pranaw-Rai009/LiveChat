import { ApiError } from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js"
import { RoomExist } from "../roomServices/roomExist.js";

export class LeaveRoom {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembership = new RoomMembership(prisma)
        this.roomExist = new RoomExist(prisma)
    }

    async execute(userId, roomId) {
        const room = await this.roomExist.execute(roomId)
        if (!room) throw new ApiError(404, "Invalid Room!")

        const me = await this.roomMembership.execute(userId, roomId)
        if (!me) throw new ApiError(403, "You are not a member of this room!")

        await this.prisma.$transaction(async (tx) => {
            const othersCount = await tx.roomMember.count({
                where: { roomId, userId: { not: userId }, leftAt: null },
            })

            if (othersCount === 0) {
                await tx.message.deleteMany({ where: { roomMember: { roomId } } })
                await tx.roomMember.deleteMany({ where: { roomId } })
                await tx.room.delete({ where: { id: roomId } })
                return //exits the transaction callback right there, so the code below it doesn’t run
            }

            if (me.role === "ADMIN") {
                const otherAdmin = await tx.roomMember.findFirst({
                    where: { roomId, role: "ADMIN", userId: { not: userId }, leftAt: null },
                })
                if (!otherAdmin) {
                    const next = await tx.roomMember.findFirst({
                        where: { roomId, userId: { not: userId }, leftAt: null },
                        orderBy: { createdAt: "asc" },
                    })
                    await tx.roomMember.update({ where: { id: next.id }, data: { role: "ADMIN" } })
                    await tx.room.update({ where: { id: roomId }, data: { adminId: next.userId } })
                }
            }

            await tx.roomMember.update({
                where: { roomId_userId: { roomId, userId } },
                data: { leftAt: new Date(), role: "MEMBER" },
            })
        })
    }
}