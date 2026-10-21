import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ApiError } from '../utils/apiError.util.js'
import {prisma} from '../db/dbConnect.js'
import {RegisterUser} from '../services/userServices/registerUser.js'
import {UpdateProfilePicture} from "../services/userServices/updateProfilePicture.js"
import {GetAllUsers} from "../services/userServices/getAllUser.js"
import {DeleteUser} from "../services/userServices/deleteUser.js"

const registerUser  = new RegisterUser({prisma})

export const register = asyncHandler(async(req, res) => {
    const {userName, email, password, role} = req.body
    if(!userName) throw new ApiError(400, "Username is misisng!")
    if(!email) throw new ApiError(400, "Email is missing!")
    if(!password) throw new ApiError(400, "Password is missing!")
    if(!role) throw new ApiError(400, "Role is missing!")
    const userData = {userName, email, password, role}
    const user = await registerUser.register(userData)
    if(!user) throw new ApiError(500, "User  NOT created")
    res.status(201).json({User: user})
})


const updateProfilePicture = new UpdateProfilePicture(prisma)

export const update = asyncHandler(async(req, res) => {
    const userId = req.user.id
    if(!req.file) throw new ApiError(400, "No Image Uploaded!")

    const updatedProfilePicture = await updateProfilePicture.update(req.file, userId)
    req.status(200).json({message: "Profile Picture Updated", NewProfilePicture:  updatedProfilePicture})
})


const getAllUsers = new GetAllUsers(prisma)

export const getAllUser = asyncHandler(async( req, res) => {
    const allUsersOuput = await GetAllUsers.getAllUsers()
    res.status(201).json({AllUsers: allUsersOuput})
})

const deleteUser = new DeleteUser()

export const deleteAccount = asyncHandler(async(req, res) => {
    const userId = req.user.id
    const isDeleted = await deleteUser.delete(userId)
    res.status(200).json({message: "User Deleted"})
})