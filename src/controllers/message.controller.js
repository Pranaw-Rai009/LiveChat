import { asyncHandler } from "../utils/asyncHandler.util.js";
import {SaveMessage} from "../services/messageServices/saveMessage.js"
import ApiError from "../utils/apiError.util.js";
import { prisma } from "../db/dbConnect.js";

const messageSave = new SaveMessage(prisma)
export const createMessageController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "Room member Id is missing!")
    const {message} = req.body
    if(!message) throw new ApiError(400, "Content is missin!")
    const newMessage = await messageSave.execute(message, roomId, req.user.id)
    if(!newMessage) throw new ApiError(500, "Error occured while saving the message")
    res.status(201).json({message: "Message Saved"})
})