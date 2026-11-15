import ApiError from "../../utils/apiError.util.js";
import { UpdateAdminToMember } from "../roomMemberServices/updateAdminToMember.js";
import {UpdateMemberToAdmin} from "../roomMemberServices/updateMemberToAdmin.js"
import { RoomAdminCheck } from "../accessServices/isRoomAdmin.js";
import { RoomMemberCheck } from "../accessServices/isRoomMember.js";

// const isRoomAdminCheck = new RoomAdminCheck()

const adminToMemberUpdate = new UpdateAdminToMember()
const memberToAdminUpdate = new UpdateMemberToAdmin()
export class UpdateRoomAdmin {
    constructor(prisma) {
        this.prisma = prisma
        this.isRoomAdminCheck = new RoomAdminCheck(prisma)
        this.isRoomMemberCheck = new RoomMemberCheck(prisma)
    }

    async execute(roomId, adminId, newAdminId) {
        const isRoomAdmin = await this.isRoomAdminCheck.execute(roomId, adminId)
        if(isRoomAdmin === null)  throw new ApiError(404, "Admin not verified!")
        if(!isRoomAdmin) throw new ApiError(500, "Error occured while verifying admin!")

        const isRoomMember = await this.isRoomMemberCheck.execute(roomId, newAdminId)
        if(isRoomMember === null) throw new ApiError(404, "User is not in group")
        if(!isRoomMember) throw new ApiError(500, "Error occured while verifying room member!")

        const newAdminData = await this.prisma.$transaction(async (tx) => {
            const updateToAdmin = await tx.room.update({
                where: {
                    id: roomId
                },
                data: {
                    adminId: newAdminId
                }
            })
            const updateRoleAdminToMember = await adminToMemberUpdate.execute(tx, adminId, roomId)
            const updateRoleMemberToAdmin = await memberToAdminUpdate.execute(tx, newAdminId, roomId)
            return {updateToAdmin, updateRoleAdminToMember, updateRoleMemberToAdmin}
        })
        return newAdminData
    }
}