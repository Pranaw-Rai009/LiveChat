import {Router} from 'express'
import {deleteRoomMemberController, listAllMemberOfARoomController, addUserToARoomController} from "../controllers/roomMember.controller.js"
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()

router.delete("/delete/:roomId", authAccess, deleteRoomMemberController)
router.get("/list/:roomId/members", authAccess, listAllMemberOfARoomController)
router.post("/add/:roomId/member", authAccess, addUserToARoomController)

export default router