import { Profiler } from "react";
import ApiError from "../../utils/apiError.util.js";
import { RoomMembership } from "../accessServices/roomMembership.js";

export class FetchRoomMessage {
    constructor(prisma) {
        this.prisma = prisma
        this.roomMembership = new RoomMembership(prisma)
    }

    async execute(userId, roomId, limit, before) {
        const isMember = await this.roomMembership.execute(userId, roomId)
        if (!isMember) throw new ApiError(404, "You are not a room member!")
        // sets limit at 1 to 45
        const take = Math.min(Math.max(limit, 1), 45)

        const rows = await this.prisma.message.findMany({
            where: {
                roomMember: { roomId },
                ...(before ? { id: { lt: before } } : {})
            },
            orderBy: { id: "desc" },
            take: take + 1,
            select: {
                id: true,
                content: true,
                createdAt: true,
                roomMember: {
                    select: {
                        id: true,
                    },
                    select: { user: {select: {id: true, userName: true, profilePic: true}} }
                }
            }
        })
        const hasMore = rows.length > take
        const messages = hasMore ? rows.slice(0, take) : rows
        const nextbefore = hasMore ? messages[messages.length - 1].id : null
        // if(messages === null) return null
        return { messages, hasMore, nextbefore }
    }
}