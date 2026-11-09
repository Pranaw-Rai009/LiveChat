import { asyncHandler } from '../utils/asyncHandler.util.js'
import  ApiError  from '../utils/apiError.util.js'
import {prisma} from '../db/dbConnect.js'
import {RegisterUser} from '../services/userServices/registerUser.js'
import {UpdateProfilePicture} from "../services/userServices/updateProfilePicture.js"
import {FetchAllUsers} from "../services/userServices/getAllUser.js"
import {DeleteUser} from "../services/userServices/deleteUser.js"
import {UpdateUserPassword} from "../services/userServices/updatePassword.js"

const userRegister  = new RegisterUser(prisma)

export const registerUserController = asyncHandler(async(req, res) => {
    const {userName, email, password, role} = req.body
    if(!userName) throw new ApiError(400, "Username is misisng!")
    if(!email) throw new ApiError(400, "Email is missing!")
    if(!password) throw new ApiError(400, "Password is missing!")
    if(!role) throw new ApiError(400, "Role is missing!")
    const userData = {userName, email, password, role}
    const user = await userRegister.execute(userData)
    if(!user) throw new ApiError(500, "User  NOT created")
    res.status(201).json({User: user})
})


const userProfilePicUpdate = new UpdateProfilePicture(prisma)

export const updateUserProfileController = asyncHandler(async(req, res) => {
    const userId = req.user.id
    if(!req.file) throw new ApiError(400, "No image uploaded!")

    const localFilePath = req.file.path
    if(!localFilePath) throw new ApiError(400, "No Image Uploaded!")
    const updatedProfilePicture = await userProfilePicUpdate.execute(localFilePath, userId)
    res.status(200).json({message: "Profile Picture Updated", NewProfilePicture:  updatedProfilePicture})
})


const userPasswordUpdate = new UpdateUserPassword(prisma)

export const updateUserPasswordController = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword1, newPassword2} = req.body
    const userId = req.owner.id
    if(!oldPassword) throw new ApiError(400, "Old password is empty")
    if(!newPassword1) throw new ApiError(400, "New Password1 is empty")
    if(!newPassword2) throw new ApiError(400, "New Password2 is empty")

    const updatedPassword = await execute(oldPassword, newPassword1, newPassword2, userId)

    res.status(201).json({message: "Password updated!"})
})
const usersFetch = new FetchAllUsers(prisma)

export const fetchAllUsersController = asyncHandler(async( req, res) => {
    const allUsersOutput = await usersFetch.execute()
    if(allUsersOutput === null) res.status(200).json({message: "No users created"})
    res.status(201).json({AllUsers: allUsersOutput})
})

const userAccountDelete = new DeleteUser(prisma)

export const deleteUserAccountController = asyncHandler(async(req, res) => {
    const userId =  req.owner
    const isDeleted = await deleteUser.execute(userId)
    res.status(200).json({message: "User Deleted"})
})
