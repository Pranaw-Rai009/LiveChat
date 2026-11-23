
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

        let newRoomData
        try {
            newRoomData = await this.prisma.$transaction(async (tx) => {
                const newRoom = await tx.room.create({
                    data: {
                        name,
                        creatorId: userId,
                        adminId: userId
                    }
                })
                const newRoomMember = await roomMemberCreate.execute(tx, newRoom.id, newRoom.creatorId)
                return { newRoom, newRoomMember }
            })
        } catch (err) {
            if(err.code === "P2002") throw new ApiError(409, "Room with name already exist!")
            throw err
        }
        return newRoomData
    }
}