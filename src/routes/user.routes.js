import { Router } from 'express'
import { registerUserController, updateUserProfileController, fetchAllUsersController, deleteUserAccountController, updateUserPasswordController } from '../controllers/user.controller.js'
import { upload } from '../../src/middlewares/multer.middleware.js'
import { authAccess } from '../middlewares/authAccess.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'
import { isAcOwner } from '../middlewares/isAccountOwner.middleware.js'

const router = Router()


router.post("/register", registerUserController)
router.get("/", authAccess, fetchAllUsersController)
router.patch("/update/:accId/profile", authAccess, isAcOwner, upload.single("profilePic"), updateUserProfileController)
router.post("/update/:accId/password", authAccess, isAcOwner, updateUserPasswordController)
router.delete("/delete/:accId", authAccess, isAcOwner, deleteUserAccountController)

// Admin's job
router.get("/fetchAllUser", authAccess, fetchAllUsersController)





export default router