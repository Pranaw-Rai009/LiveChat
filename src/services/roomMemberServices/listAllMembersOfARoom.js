// import { userRole } from "../../generated/prisma/enums.js";
import ApiError from "../../utils/apiError.util.js";

export class ListAllMemberOfARoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId) {
        const allMembers = await this.prisma.roomMember.findMany({
            where: {
                roomId
            },
            select: {
                userId: true,
                roomId: true,
                role: true,
                id: true,
                createdAt: true,
                updatedAt: true
            }
        })
        console.log(allMembers)
        if(allMembers === null) return null
        return allMembers

    }
}