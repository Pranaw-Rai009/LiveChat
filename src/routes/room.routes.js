import {Router} from 'express'
import {createRoomController,  deleteRoomController, fetchAllRoomController, fetchOneRoomController, updateRoomAdminController} from '../controllers/room.controller.js'
import {authAccess} from '../middlewares/authAccess.middleware.js'
const router = Router()


// Admin
router.get("/fetch/rooms", authAccess, fetchAllRoomController)
 
router.post("/create", authAccess, createRoomController)
router.get("/fetch/:roomId", authAccess, fetchOneRoomController)
router.patch("/update/:roomId/admin", authAccess, updateRoomAdminController)
router.delete("/delete/:roomId", authAccess, deleteRoomController)



export default router