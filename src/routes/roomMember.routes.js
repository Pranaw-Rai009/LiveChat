import {Router} from 'express'
import {deleteRoomMemberController, listAllMemberOfARoomController} from "../controllers/roomMember.controller.js"
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()

router.delete("/delete/:roomId", authAccess, deleteRoomMemberController)
router.get("/listRoomMember/:roomId", authAccess, listAllMemberOfARoomController)

export default router