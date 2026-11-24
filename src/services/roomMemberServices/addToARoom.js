import ApiError from "../../utils/apiError.util.js";
import { RoomAdminCheck } from "../accessServices/isRoomAdmin.js";
import { RoomExist } from "../roomServices/roomExist.js";

export class AddToRoom {
    constructor(prisma) {
        this.prisma = prisma
        this.roomAdminCheck = new RoomAdminCheck(prisma)
        this.roomExistCheck = new RoomExist(prisma)
    }

    async execute(newUserId, roomId, role, adminId) {
                const roomExist = await this.roomExistCheck.execute(roomId)
        if(roomExist === null) throw new ApiError(404, "Invalid roomId!")

        const isAdmin = await this.roomAdminCheck.execute(roomId, adminId)
        if(isAdmin === null) throw new ApiError(401, "You are not room admin!")
        
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: newUserId
            }
        })
        if(userExist === null) throw new ApiError(404, "Invalid new User Id")

        const newRoomMember = await this.prisma.roomMember.create({
            data: {
                roomId,
                userId: newUserId,
                role
            }
        })
        return newRoomMember
    }
}