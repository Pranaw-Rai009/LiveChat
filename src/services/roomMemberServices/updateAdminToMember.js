export class UpdateAdminToMember {
    async execute(db, adminId, roomId) {
        const updateToMemberData = await db.roomMember.update({
            where: {
                roomId_userId: {roomId, userId: adminId }
            },
            data: {
                role: "MEMBER"
            }
        })
        return updateToMemberData
    }
}