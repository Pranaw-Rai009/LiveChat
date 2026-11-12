import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import {prisma} from "../db/dbConnect.js"
import {CreateRoom} from "../services/roomServices/createRoom.js"
import { DeleteRoom } from "../services/roomServices/deleteRoom.js";
import { FetchRoom } from "../services/roomServices/fetchAllRooms.js";
import {FetchARoomDetail} from "../services/roomServices/fetchARoom.js"

const roomCreate = new CreateRoom(prisma)
export const createRoomController = asyncHandler(async(req, res) => {
    const {name} = req.body
    const userId = req.user.id
    if(!name) throw new ApiError(400, "Room name is required!")
    const newRoom = await roomCreate.execute(name, userId)
    res.status(201).json({message: "Room Created", NewRoom: newRoom})
})

const roomDelete = new DeleteRoom(prisma)
export const deleteRoomController = asyncHandler(async(req, res) => {
    const roomId = req.params.roomId
    if(!roomId) throw new ApiError(400, "Room id is required!")

    const deleteRoom = await roomDelete.execute(roomId)
    if(deleteRoom === true) res.status(200).json({message: `Room ${roomId} deleted`})
})

const roomFetchAll = new FetchRoom(prisma)
export const fetchAllRoomController = asyncHandler(async(req, res) => {
    const allRooms = await roomFetchAll.execute()
    res.status(200).json({message: "All Rooms: ", allRooms})
})

const roomFetch = new FetchARoomDetail(prisma)
export const fetchARoomController = asyncHandler(async(req, res) => {
    const roomId = req.params.id
    if(!roomdId) throw new ApiError(400, "Room id is missing!")
    const roomData = await roomFetch.execute(roomId)
res.status(200).json({message: "Room Data", RoomData: roomData})
})

