import ApiError from "../../utils/apiError.util.js";
import jwt from 'jsonwebtoken'
import { generateAccessToken } from "../../utils/token.util.js"

export class RefreshAccessToken {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(incomingRefreshToken) {
        let payload
        try {
            payload = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        } catch (err) {
            if (err.name === "TokenExpiredError") throw new ApiError(401, "Refresh Token Expired!")
            throw new ApiError(401, "Invalid Refresh Token!")
        }
        const userId = payload.id
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (user === null) throw new ApiError(404, "User doesnt exist with this id")

        const accessToken = await generateAccessToken(user)
        if (!accessToken) throw new ApiError(500, "Error occured while generating access token")
        return accessToken
    }
}