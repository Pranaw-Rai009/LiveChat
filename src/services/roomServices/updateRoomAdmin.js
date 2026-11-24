import ApiError from "../../utils/apiError.util.js";
import { UpdateAdminToMember } from "../roomMemberServices/updateAdminToMember.js";
import { UpdateMemberToAdmin } from "../roomMemberServices/updateMemberToAdmin.js"
import { RoomAdminCheck } from "../accessServices/isRoomAdmin.js";
import { RoomMemberCheck } from "../accessServices/isRoomMember.js";
import { RoomExist } from "../../services/roomServices/roomExist.js"
import { useId } from "react";

export class UpdateRoomAdmin {
    constructor(prisma) {
        this.prisma = prisma
        this.isRoomAdminCheck = new RoomAdminCheck(prisma)
        this.isRoomMemberCheck = new RoomMemberCheck(prisma)
        this.adminToMemberUpdate = new UpdateAdminToMember()
        this.memberToAdminUpdate = new UpdateMemberToAdmin()
        this.roomExistCheck = new RoomExist(prisma)
    }

    async execute(roomId, adminId, newAdminId) {
        const nextAdminExist = await this.prisma.user.findUnique({
            where: {
                id: newAdminId
            }
        })
        if(nextAdminExist === null) throw new ApiError(404, "Invalid new admin Id!")
        const roomExist = await this.roomExistCheck.execute(roomId)
        if (roomExist == null) throw new ApiError(404, "Room with this id doesn't exist")
        const isRoomAdmin = await this.isRoomAdminCheck.execute(roomId, adminId)
        if (isRoomAdmin === null) throw new ApiError(404, "You're not the Admin!")

        const isNextAdminRoomMember = await this.isRoomMemberCheck.execute(roomId, newAdminId)
        if (isNextAdminRoomMember === null) throw new ApiError(404, "User is not in this room")

        const newAdminData = await this.prisma.$transaction(async (tx) => {
            const updateToAdmin = await tx.room.update({
                where: {
                    id: roomId
                },
                data: {
                    adminId: newAdminId
                }
            })
            const updateRoleAdminToMember = await this.adminToMemberUpdate.execute(tx, adminId, roomId)
            const updateRoleMemberToAdmin = await this.memberToAdminUpdate.execute(tx, newAdminId, roomId)
            return { updateToAdmin, updateRoleAdminToMember, updateRoleMemberToAdmin }
        })
        return newAdminData
    }
}