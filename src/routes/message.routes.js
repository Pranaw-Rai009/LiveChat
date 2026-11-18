import { Router } from "express";
import { authAccess } from "../middlewares/authAccess.middleware.js";
import { createMessageController } from "../controllers/message.controller.js";

const router = Router()

router.post("/:roomId", authAccess, createMessageController)

export default router