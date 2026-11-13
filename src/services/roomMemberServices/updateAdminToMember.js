import ApiError from "../../utils/apiError.util.js";

export class UpdateAdminToMember {
    async execute(db, adminId, roomId) {
        const updateToMemberData = await db.roomMember.update({
            where: {
                roomId_userId: {roomId: parseInt(roomId), userId: adminId}
            },
            data: {
                role: "MEMBER"
            }
        })
        if(!updateToMemberData) throw new ApiError(500, "Error occured while updating admin to member!")
        return updateToMemberData
    }
}