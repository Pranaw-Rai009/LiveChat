import {Router} from 'express'
import {deleteRoomMemberController, listAllMemberOfARoomController, addUserToARoomController, joinRoomController, fetchMyRoomsController} from "../controllers/roomMember.controller.js"
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()

router.delete("/delete/:roomId/member/:userId", authAccess, deleteRoomMemberController)
router.get("/list/:roomId/members", authAccess, listAllMemberOfARoomController)
router.post("/add/:roomId/member", authAccess, addUserToARoomController)
router.post("/join/:roomId/room", authAccess, joinRoomController)

export default router