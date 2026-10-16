import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ApiError } from '../utils/apiError.util.js'
import {prisma} from '../db/dbConnect.js'

const registerUser  = new RegisterUser({prisma})

export const register = asyncHandler(async(req, res) => {
    const {userName, email, password, role} = req.body
    if(!username) throw new ApiError(400, "Username is misisng!")
    if(!email) throw new ApiError(400, "Email is missing!")
    if(!password) throw new ApiError(400, "Password is missing!")
    if(!role) throw new ApiError(400, "Role is missing!")

    const userData = {userName, email, password, role}
    const user = registerUser.register(userData)
    res.status(201).json({User: user})
})