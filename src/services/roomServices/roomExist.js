import ApiError from "../../utils/apiError.util.js";

export class RoomExist {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, db = this.prisma) {
        const room = await db.room.findUnique({
            where: {
                id: roomId
            } 
        })
        if(!room) throw new ApiError(404, "Room with this id doesn't exist!")
        return room
    }
}
