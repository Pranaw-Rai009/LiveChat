import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const createRoomController = asyncHandler(async(req, res) => {
    const {name} = req.body
    const userId = req.user.id
    if(!name) throw new ApiError(400, "Room name is required!")
    
})