import { asyncHandler } from "../utils/asyncHandler.util.js";
import  ApiError  from "../utils/apiError.util.js";
import { prisma } from "../db/dbConnect.js";
import { UserLogin } from "../services/userSession.services/login.js"
 import {RefreshAccessToken} from "../services/userSession.services/refreshAccessToken.js"


const userLogin = new UserLogin(prisma)

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email) throw new ApiError(400, "Email is missing!")
    if (!password) throw new ApiError(400, "Password is missing")

    const loggedUser = await userLogin.login(email, password)
    
    const { newRefreshToken, newAccessToken } = loggedUser
    res.cookie("newRefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true
    })

    res.status(200).json({ message: "User Logged In Successfully!", AccessToken: newAccessToken })
})


const refreshAccessToken = new RefreshAccessToken(prisma)
 
export const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken
    if(!incomingRefreshToken) throw new ApiError(404, "Refresh Token missing for verification!")
    
    const newAccessToken = await refreshAccessToken(incomingRefreshToken)
    res.status(200).json({AccessToken: newAccessToken})
})