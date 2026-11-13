import ApiError from "../../utils/apiError.util.js";

export class UpdateMemberToAdmin {
    async execute(db, newAdminId, roomId) {
        const updateToAdminData = await db.roomMember.update({
            where: {
               roomId_userId: {roomId: parseInt(roomId), userId: newAdminId}
            },
            data: {
                role: "ADMIN"
            }
        })
        if(!updateToAdminData) throw new ApiError(500, "Error occured while updating from member to admin!")
        return updateToAdminData
    }
}
