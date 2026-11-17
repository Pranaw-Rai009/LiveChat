import { compareSync } from "bcrypt";
import ApiError from "../../utils/apiError.util.js";

export class AddToRoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId, roomId, role) {
        const newRoomMember = await this.prisma.roomMember.create({
            data: {
                // roomId_userId: {roomId, userId},// err check
                roomId,
                userId,
                role
            }
        })
        console.log(newRoomMember)
        if(!newRoomMember) throw new ApiError(400, "Error occured while adding user to room!")
        return newRoomMember
    }
}