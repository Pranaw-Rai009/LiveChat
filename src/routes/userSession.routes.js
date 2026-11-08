import { Router } from "express";
import { loginUserController, refreshAccessTokenController } from '../controllers/userSession.controller.js'
import { authAccess } from "../middlewares/authAccess.middleware.js";

const router = Router()

router.post("/login", loginUserController)
router.post("/refreshAccToken",  refreshAccessTokenController)

export default router