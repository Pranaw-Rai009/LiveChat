import {Router} from 'express'
import {createRoomController,  deleteRoomController, fetchAllRoomController, fetchARoomController, updateRoomAdminController} from '../controllers/room.controller.js'
import {authAccess} from '../middlewares/authAccess.middleware.js'
const router = Router()

router.post("/create", authAccess, createRoomController)
router.get("/fetch/:roomId", authAccess, fetchARoomController)
router.delete("/delete/:roomId", authAccess, deleteRoomController)
router.patch("/update/:roomId/admin", authAccess, updateRoomAdminController)

// Admin
router.get("/fetch/all", authAccess, fetchAllRoomController)

export default router