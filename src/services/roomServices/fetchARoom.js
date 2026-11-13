import ApiError from "../../utils/apiError.util.js";

export class FetchARoomDetail {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId) {
        const roomData = await this.prisma.room.findUnique({
            where: {
                id: parseInt(roomId)
            }
        })
        if(roomData === null) throw new ApiError(404, "Room with this id doesn't exist!")
        return roomData
    }
}