// import { join } from "@prisma/client/runtime/client";
import ApiError from "../../utils/apiError.util.js";
import { RoomAdminCheck } from "../accessServices/isRoomAdmin.js";

export class FetchJoinedRooms {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        const joinedRooms = await this.prisma.roomMember.findMany({
            where: {
                userId
            },
            select: {
                room: true,
                id: true,
                roomId: true,
                userId: true
            },
        })
        if(joinedRooms.length === 0) return null
        return joinedRooms
    }
}