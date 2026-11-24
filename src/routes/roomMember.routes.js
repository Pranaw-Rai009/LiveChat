import {Router} from 'express'
import {deleteRoomMemberController, listAllMemberOfARoomController, addUserToARoomController, joinRoomController, fetchMyRoomsController, leaveRoomController} from "../controllers/roomMember.controller.js"
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()

router.get("/list/:roomId", authAccess, listAllMemberOfARoomController)

router.delete("/delete/:roomId/member/:userId", authAccess, deleteRoomMemberController)
router.post("/add/:roomId/member", authAccess, addUserToARoomController)
router.post("/join/:roomId/room", authAccess, joinRoomController)
router.get("/room", authAccess, fetchMyRoomsController)
router.post("/leave/:roomId", authAccess, leaveRoomController)


export default router