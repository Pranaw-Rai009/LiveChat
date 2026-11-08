import ApiError from "../../utils/apiError.util.js";
import jwt from 'jsonwebtoken'
import {generateAccessToken} from "../../utils/token.util.js"

export class RefreshAccessToken {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(incomingRefreshToken) {
        const verifyRefreshToken =  await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        if(!verifyRefreshToken) throw new ApiError(401, "Refresh Token  is expired / Invalid" )
        console.log("Hellow")
        const userId = verifyRefreshToken.id
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if(!user) throw new ApiError(404, "User doesnt exist with this id")
        
        const accessToken = await generateAccessToken(user)
        if(!accessToken) throw new ApiError(500, "Error occured while generating access token")
        return accessToken
    }
}