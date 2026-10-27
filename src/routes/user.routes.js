import { Router } from 'express'
import { register, update,getAllUser, deleteAccount } from '../controllers/user.controller.js'
import { upload } from '../../src/middlewares/multer.middleware.js'
import { authAccess } from '../middlewares/authAccess.middleware.js'

const router = Router()


router.post("/register", register)
router.patch("/updateProfilePic", upload.single("proifilePic"), authAccess, update)
router.get("/getAllUser", authAccess, getAllUser)
router.get("/delete", authAccess, deleteAccount)


export default router