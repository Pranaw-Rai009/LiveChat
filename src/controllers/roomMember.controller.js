import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import  {DeleteRoomMember} from "../services/roomMemberServices/deleteRoomMember.js"
import { prisma } from "../db/dbConnect.js";

const roomMemberDelete = new DeleteRoomMember(prisma)
export const deleteUserController = asyncHandler(async(req, res) => {
    const userId = req.user.id
    const deletedRoomMember = 
})