import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import {prisma} from "../db/dbConnect.js"
import {CreateRoom} from "../services/roomServices/createRoom.js"
import { DeleteRoom } from "../services/roomServices/deleteRoom.js";
import { FetchRooms} from "../services/roomServices/fetchAllRooms.js";
import {FetchARoomDetail} from "../services/roomServices/fetchARoom.js"
import {UpdateRoomAdmin} from "../services/roomServices/updateRoomAdmin.js"

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

const roomFetchAll = new FetchRooms(prisma)
export const fetchAllRoomController = asyncHandler(async(req, res) => {
    const allRooms = await roomFetchAll.execute()
    res.status(200).json({message: "All Rooms: ", allRooms})
})

const roomFetch = new FetchARoomDetail(prisma)
export const fetchOneRoomController = asyncHandler(async(req, res) => {
    const roomId = parseInt(req.params.roomId)
    if(!roomId) throw new ApiError(400, "Room id is missingglll!")
    const roomData = await roomFetch.execute(roomId)
res.status(200).json({message: "Room Data", RoomData: roomData})
})

const roomAdminUpdate = new UpdateRoomAdmin(prisma)
export const updateRoomAdminController = asyncHandler(async(req, res) => {
    const adminId = req.user.id
    const roomId = parseInt(req.params.roomId)
    const {newAdminId} = req.body
    if(!newAdminId) throw new ApiError(400, "Next AdminId is missing!")
    if(!roomId) throw new ApiError(400, "Room Id is missing!")
    const newAdmin = await roomAdminUpdate.execute(roomId, adminId, newAdminId)
    res.status(200).json({message: "Admin updated Successfully", 
        data: {
            room: {
                id: newAdmin.updateToAdmin.id,
                name: newAdmin.updateToAdmin.name,
                creatorId: newAdmin.updateToAdmin.creatorId,
                adminId: newAdmin.updateToAdmin.adminId
            },

            previousAdmin: {
                id: newAdmin.updateRoleAdminToMember.id,
                userId: newAdmin.updateRoleAdminToMember.userId,
                role: newAdmin.updateRoleAdminToMember.role
            },

            newAdmin: {
                id: newAdmin.updateRoleMemberToAdmin.id,
                userId: newAdmin.updateRoleMemberToAdmin.userId,
                role: newAdmin.updateRoleMemberToAdmin.role
            }
        }
    })
})


