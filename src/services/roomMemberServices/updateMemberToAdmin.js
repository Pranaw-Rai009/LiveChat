export class UpdateMemberToAdmin {
    async execute(db, newAdminId, roomId) {
        const updateToAdminData = await db.roomMember.update({
            where: {
               roomId_userId: {roomId, userId: newAdminId}
            },
            data: {
                role: "ADMIN"
            }
        })
        return updateToAdminData
    }
}
