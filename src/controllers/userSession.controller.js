import { asyncHandler } from "../utils/asyncHandler.util.js";
import  ApiError  from "../utils/apiError.util.js";
import { prisma } from "../db/dbConnect.js";
import { UserLogin } from "../services/userSessionServices/login.js"
 import {RefreshAccessToken} from "../services/userSessionServices/refreshAccessToken.js"
import ms from "ms";

const userLogin = new UserLogin(prisma)

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email) throw new ApiError(400, "Email is missing!")
    if (!password) throw new ApiError(400, "Password is missing")

    const loggedUser = await userLogin.execute(email, password)
    
    const { newRefreshToken, newAccessToken } = loggedUser
    res.cookie("newRefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
         maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
    })

    res.status(200).json({ message: "User Logged In Successfully!", AccessToken: newAccessToken })
})


const refreshAccessToken = new RefreshAccessToken(prisma)
 
export const refreshAccessTokenController = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.newRefreshToken
    if(!incomingRefreshToken) throw new ApiError(404, "Refresh Token missing for verification!")
    
    const newAccessToken = await refreshAccessToken.execute(incomingRefreshToken)
    res.status(200).json({AccessToken: newAccessToken})
})