import {Router} from 'express'
import {deleteRoomMemberController} from "../controllers/roomMember.controller.js"
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()

router.delete("/delete/:roomId", authAccess, deleteRoomMemberController)

export default router