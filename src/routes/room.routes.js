import {Router} from 'express'
import {createRoomController,  deleteRoomController, fetchAllRoomController, fetchARoomController} from '../controllers/room.controller.js'
import {authAccess} from '../middlewares/authAccess.middleware.js'
const router = Router()

router.post("/create", authAccess, createRoomController)
router.delete("/delete/:roomId", authAccess, deleteRoomController)
router.get("/fetch", authAccess, fetchAllRoomController)
router.get("/fetchA/:roomId", authAccess, fetchARoomController)



export default router