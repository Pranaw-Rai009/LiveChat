import { asyncHandler } from "../utils/asyncHandler.util.js";
import {SaveMessage} from "../services/messageServices/saveMessage.js"
import {FetchRoomMessage} from "../services/messageServices/fetchRoomMessage.js"
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

const fetchRoomMessage = new FetchRoomMessage(prisma)
export const fetchRoomMessageController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "Room Id is missing!")
    const  limit = parseInt(req.query.limit)
    
    const before = 185;
    const allMessage = await fetchRoomMessage.execute(req.user.id, roomId, limit, before)
    const {messages, hasMore, nextbefore} = allMessage
    const data = messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        memberId: msg.roomMember.id,
        userId: msg. roomMember.user.id,
        userName: msg.roomMember.user.userName,
        profilePic: msg.roomMember.user.profilePic
    }))
    res.status(200).json({message: "All message: ", data})
})