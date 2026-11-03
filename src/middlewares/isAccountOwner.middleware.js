import { prisma } from "../db/dbConnect.js";
import ApiError from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const isAcOwner = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const accId = req.params.userId
    if (!accId) throw new ApiError(400, "Account Id is missing!")
    const isAccountId = await prisma.user.findUnique({
        where: {
            id: parseInt(accId)
        }
    })
    if(!isAccountId) throw new ApiError(404, "Id not found!")
    const isOwner = isAccountId.id === userId
    if(!isOwner) throw new ApiError(401, "Your are not the account owner!")
    req.owner = isAccountId.id
    next()
})