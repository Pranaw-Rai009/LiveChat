
import ApiError from "../../utils/apiError.util.js";
import { CreateRoomMember } from '../roomMemberServices/createRoomMember.js'


const roomMemberCreate = new CreateRoomMember()
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
        if (roomExist) throw new ApiError(409, "Room name is already taken!")

        const newRoomData = await this.prisma.$transaction(async (tx) => {
            const newRoom = await tx.room.create({
                data: {
                    name,
                    creatorId: userId,
                    adminId: userId
                }
            })
            const newRoomMember = await roomMemberCreate.execute(tx, newRoom.id, newRoom.creatorId)
            if (!newRoom) throw new ApiError(500, "Error occured while creating room!")
            return { newRoom, newRoomMember }
        })
        return newRoomData
    }
}