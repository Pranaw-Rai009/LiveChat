import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ApiError } from '../utils/apiError.util.js'
import {prisma} from '../db/dbConnect.js'
import {RegisterUser, UpdateProfilePicture} from '../services/userServices/registerUser.js'

const registerUser  = new RegisterUser({prisma})

export const register = asyncHandler(async(req, res) => {
    const {userName, email, password, role} = req.body
    if(!userName) throw new ApiError(400, "Username is misisng!")
    if(!email) throw new ApiError(400, "Email is missing!")
    if(!password) throw new ApiError(400, "Password is missing!")
    if(!role) throw new ApiError(400, "Role is missing!")
    const userData = {userName, email, password, role}
    const user = await registerUser.register(userData)
    res.status(201).json({User: user})
})


const updateProfilePicture = new UpdateProfilePicture(prisma)

export const update = asyncHandler(async(req, res) => {
    const userId = req.user.id
    if(!req.file) throw new ApiError(400, "No Image Uploaded!")

    const updatedProfilePicture = await updateProfilePicture.update(req.file)
    req.status(200).json({message: "Profile Picture Updated", NewProfilePicture:  updatedProfilePicture})
})