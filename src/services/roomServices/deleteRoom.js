import ApiError from "../../utils/apiError.util.js";
import { RoomExist } from "./roomExist.js";

export class DeleteRoom {
    constructor(prisma) {
        this.prisma = prisma
        this.roomExist = new RoomExist(prisma)
    }

    async execute(roomId) {

        const roomCheck = await this.roomExist.execute(roomId)
        if(roomCheck === null) throw new ApiError(404,"Room with this ID doesn't exist!")
        
        const deleteRoom = await this.prisma.room.delete({
            where: {
                id: parseInt(roomId)
            }
        })
        if(!deleteRoom) throw new ApiError(500, "Error occured while deleting the room!")
        return true
    }
}