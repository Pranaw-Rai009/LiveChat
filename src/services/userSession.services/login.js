import { RefreshTokenScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../utils/apiError.util.js";
import {hashPasssword, comparePassword} from "../../utils/passwordHash.util.js"
import {generateAccessToken, generateRefreshToken} from "../../utils/token.util.js"
import ms from 'ms'

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

        const refreshTokenExpiry = new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY))
        if(!refreshTokenExpiry) throw new ApiError(500, "Error occured while generating refresh token epxiry date!")

        const saveNewRefreshToken = await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: newRefreshToken,
                expiresAt: refreshTokenExpiry
            }
        })
        if(!saveNewRefreshToken) throw new ApiError(500, "Error occured while saving refresh token!")
            return {refreshToken, accessToken}
    }
}