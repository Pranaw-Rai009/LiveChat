import ApiError from "../../utils/apiError.util.js";

export class DeleteRoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId) {
        const roomExist = await this.prisma.room.findUnque({
            where: {
                id: roomId
            }
        })
        if(!roomExist) throw  new ApiError(404, "Room not found!")
        
        const deleteRoom = await this.prisma.room.delete({
            where: {
                id: roomId
            }
        })
        if(!deleteRoom) throw new ApiError(500, "Error occured while deleting the room!")
        return true
    }
}