import { join } from "@prisma/client/runtime/client";
import ApiError from "../../utils/apiError.util.js";

export class FetchJoinedRooms {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        const joinedRooms = await this.prisma.roomMember.findMany({
            where: {
                userId
            },
            include: {
                room: true
            }
        })
        if(joinedRooms.length === 0) return null
        return joinedRooms
    }
}