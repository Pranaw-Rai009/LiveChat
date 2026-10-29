import { Router } from "express";
import { login, refreshAccessToken } from '../controllers/userSession.controller.js'
import { authAccess } from "../middlewares/authAccess.middleware.js";
const router = Router()

router.post("/", login)
router.post("refreshAccToken", authAccess, refreshAccessToken)

export default router