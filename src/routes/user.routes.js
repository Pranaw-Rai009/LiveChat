import { Router } from 'express'
import { registerUserController, updateUserProfileController, fetchAllUsersController, deleteUserAccountController, updateUserPasswordController } from '../controllers/user.controller.js'
import { upload } from '../../src/middlewares/multer.middleware.js'
import { authAccess } from '../middlewares/authAccess.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'
import { isAcOwner } from '../middlewares/isAccountOwner.middleware.js'

const router = Router()


router.post("/register", registerUserController)
router.post("/updatePassword/:userId", authAccess, isAcOwner, updateUserPasswordController)



router.patch("/updateProfilePicture/:userId", authAccess, isAcOwner, upload.single("profilePic"), updateUserProfileController)
router.get("/fetchAllUser", authAccess, fetchAllUsersController)

router.delete("/delete/:userId", authAccess, isAcOwner, deleteUserAccountController)

// Admin's job
router.get("/fetchAllUser", authAccess, fetchAllUsersController)

export default router