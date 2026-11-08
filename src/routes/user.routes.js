import { Router } from 'express'
import { registerUserController, updateUserProfileController, fetchAllUsersController, deleteUserAccountController, updateUserPasswordController } from '../controllers/user.controller.js'
import { upload } from '../../src/middlewares/multer.middleware.js'
import { authAccess } from '../middlewares/authAccess.middleware.js'
import {isAdmin} from '../middlewares/isAdmin.middleware.js'
import { isAcOwner } from '../middlewares/isAccountOwner.middleware.js'

const router = Router()


router.post("/register", registerUserController)
router.patch("/updatePassword", authAccess, isAcOwner, updateUserPasswordController)
router.patch("/updateProfilePicture", upload.single("proifilePic"), authAccess, updateUserProfileController)
router.get("/fetchAllUser", authAccess, isAdmin, fetchAllUsersController)
router.delete("/delete/:userId", authAccess, isAcOwner,  deleteUserAccountController)


export default router