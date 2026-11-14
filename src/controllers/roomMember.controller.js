import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { prisma } from "../db/dbConnect.js";
import  {DeleteRoomMember} from "../services/roomMemberServices/deleteRoomMember.js"
import { ListAllMemberOfARoom } from "../services/roomMemberServices/listAllMembersOfARoom.js";
import { AddToRoom } from "../services/roomMemberServices/addToARoom.js";
import { JoinRoom } from "../services/roomMemberServices/joinARoom.js";
import { FetchMyRooms } from "../services/roomMemberServices/fetchJoinedRooms.js";

const roomMemberDelete = new DeleteRoomMember(prisma)
export const deleteRoomMemberController = asyncHandler(async(req, res) => {
    const roomId =  parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "Room id is mising!")
    const userId = parseInt(req.params.userId)
    const deletedRoomMember = roomMemberDelete.execute(userId, roomId)
    res.status(200).json({message: "Room member removed"})
})

const roomMembersListOfARoom = new ListAllMemberOfARoom(prisma)
export const listAllMemberOfARoomController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "Room Id is missing!")
    const allMemberList = await roomMembersListOfARoom.execute(roomId)
    res.status(200).json({message: "All members:", allMemberList})
})

const roomNewMember = new AddToRoom(prisma)
export const addUserToARoomController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "RoomId cannot be empty!")
    const {userId} = req.body
    if(!userId) throw new ApiError(400, "User Id is missing!")
    const role = "MEMBER"
    const newMember = await roomNewMember.execute(userId, roomId, role)
    res.status(200).json({message: "Added to room", newMember})
})

const roomJoin = new JoinRoom(prisma)
export const joinRoomController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw  new ApiError(400, "Room Id is required!")
    const userId = req.user.id
    const defRole = "MEMBER"
    const join = await roomJoin.execute(userId, roomId, defRole)
    res.status(200).json({message: `Joined Room ${roomId}`})
})


const fetchMyRooms = new FetchMyRooms(prisma)
export const fetchMyRoomsController = asyncHandler(async(req, res) => {
    const userId = req.user.id
    if(!userId) throw new ApiError(400, "User Id is required!")
    const rooms = await fetchMyRooms.execute(userId)
    res.status(200).json({message: "All Rooms", rooms})
})
