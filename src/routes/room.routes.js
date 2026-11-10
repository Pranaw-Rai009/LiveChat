import {Router} from 'express'
import {createRoomController,  deleteRoomController, fetchRoomController} from '../controllers/room.controller.js'
import {authAccess} from '../middlewares/authAccess.middleware.js'
const router = Router()

router.post("/create", authAccess, createRoomController)
router.delete("/delete/:roomId", authAccess, deleteRoomController)
router.get("/fetch", authAccess, fetchRoomController)



export default router