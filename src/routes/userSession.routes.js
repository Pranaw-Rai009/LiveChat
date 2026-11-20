import { Router } from "express";
import { loginUserController, refreshAccessTokenController } from '../controllers/userSession.controller.js'
import { authAccess } from "../middlewares/authAccess.middleware.js";
import { logOutController } from "../controllers/userSession.controller.js";

const router = Router()

router.post("/login", loginUserController)
router.post("/refreshAccToken",  refreshAccessTokenController)
router.post("/logout", authAccess, logOutController)

export default router