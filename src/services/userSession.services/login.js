import { RefreshTokenScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../utils/apiError.util.js";
import {hashPasssword, comparePassword} from "../../utils/passwordHash.util.js"
import {generateAccessToken, generateRefreshToken} from "../../utils/token.util.js"

class UserLogin {
    constructor(prisma) {
        this.prisma = prisma
    }

    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user ) throw new ApiError(404, "Email doesn't exist!")
        
        const hashedPassword = await hashPasssword(password)
        if(!hashPasssword) throw new ApiError(500, "Error occured while hashing the password!")

        const isCorrectPassword = await comparePassword(hashedPassword, user.password)
        if(!isCorrectPassword) throw new ApiError(401, "Incorrect Password!")

        const newAccessToken = await generateAccessToken(user)
        if(!newAccessToken) throw new ApiError(500, "Error occured while generating access token!")
        
        const newRefreshToken = await generateRefreshToken(user)
        if(!newRefreshToken) throw new ApiError(500, "Error occured while generating refresh token!")

        const saveRefreshToken

        
        


    }
}