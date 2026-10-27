import { prisma } from "../db/dbConnect.js";
import ApiError from "../utils/apiError.util.js";
import { asyncHandler} from "../utils/asyncHandler.util.js";

export const idAdmin = asyncHandler(async(req, res, next) => {
    const userId = req.user.id
    const isAdmin = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if(isAdmin.role !="ADMIN")  throw new ApiError(403, "You are not an Admin [UNAUTHORIZED]")
    next()
})