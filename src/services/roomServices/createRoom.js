
import ApiError from "../../utils/apiError.util.js";


export class CreateRoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(name, userId) {
        const roomExist = await this.prisma.room.findUnique({
            where: {
                name
            }
        })
        if(roomExist) throw new ApiError(409, "Room name is already taken!")

        const newRoom = await this.prisma.room.create({
            data: {
                name,
                creatorId: userId
            }
        })
        if(!newRoom) throw new ApiError(500, "Error occured while creating room!")
        return newRoom
    }
}