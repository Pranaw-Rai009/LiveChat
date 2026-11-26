import { Router } from "express";
import { authAccess } from "../middlewares/authAccess.middleware.js";
import {  fetchRoomMessageController } from "../controllers/message.controller.js";

const router = Router()

// router.post("/:roomId", authAccess, createMessageController)
router.get("/:roomId/message", authAccess, fetchRoomMessageController)

export default router