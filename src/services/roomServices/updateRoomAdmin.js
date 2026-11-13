import ApiError from "../../utils/apiError.util.js";
import { UpdateAdminToMember } from "../roomMemberServices/updateAdminToMember.js";
import {UpdateMemberToAdmin} from "../roomMemberServices/updateMemberToAdmin.js"

const adminToMemberUpdate = new UpdateAdminToMember()
const memberToAdminUpdate = new UpdateMemberToAdmin()
export class UpdateRoomAdmin {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, adminId, newAdminId) {
        const newAdminData = await this.prisma.$transaction(async (tx) => {
            const updateToAdmin = await tx.room.update({
                where: {
                    id: parseInt(roomId)
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