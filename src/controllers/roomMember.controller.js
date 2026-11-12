import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import  {DeleteRoomMember} from "../services/roomMemberServices/deleteRoomMember.js"
import { prisma } from "../db/dbConnect.js";

const roomMemberDelete = new DeleteRoomMember(prisma)
export const deleteRoomMemberController = asyncHandler(async(req, res) => {
    const roomId = req.params.roomId
    if(!roomId) throw new ApiError(400, "Room id is mising!")
    const userId = req.user.id 
    const deletedRoomMember = roomMemberDelete.execute(userId, roomId)
    res.status(200).json({message: "Room member removed"})
})