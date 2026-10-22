import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/apiError.util.js";
import {UserLogin} from "../services/userSession.services/login.js"
import { prisma } from "../db/dbConnect.js";


const userLogin = new UserLogin(prisma)

export const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email) throw new ApiError(400, "Email is missing!")
    if(!password) throw new ApiError(400, "Password is missing")
    
    const loggedUser = userLogin.login(email, password)
    res.status(200).json({message: "User LoggedIn"})
})