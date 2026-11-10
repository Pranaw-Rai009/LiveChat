import ApiError from "../../utils/apiError.util.js";

export class CreateRoomMember {
    async execute(db, roomId, roomCreatorId) {
        const newRoomMember = await db.roomMember.create({
            data: {
                roomId,
                userId: roomCreatorId,
                role: "ADMIN"
            }
        })
        return newRoomMember
    }
}