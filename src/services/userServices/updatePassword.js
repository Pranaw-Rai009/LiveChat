import { hash } from "bcrypt";
import ApiError from "../../utils/apiError.util.js";
import {hashPasssword} from "../../utils/passwordHash.util.js"

export class UpdateUserPassword  {
    constructor(prisma) {
        this.prisma = prisma
    }

    async updatePassword(oldPassword, newPassword1, newPassword2, userId) {
        const isCorrectPassword = await this.prisma.user.findFirst({
            where: {
                id: userId,
                password:  oldPassword
            }
        })
        if(!isCorrectPassword) throw new ApiError(401, "Incorrect password entered!")
        if(newPassword1.length < 12) throw new ApiError(400, "Password1 must be greater than 12 character!")
        if(newPassword2.length < 12) throw new ApiError(400, "Password2 must be greater than 12 character!")
        if(newPassword1 !== newPassword2) throw new ApiError(400, "New Passwords don't match!")

        const newHasehdPassword = await hashPasssword(newPassword1) 
        if(!newHasehdPassword) throw new ApiError(500, "Error occured while hashing new password!")
            
    }
}