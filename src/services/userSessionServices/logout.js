import ApiError from "../../utils/apiError.util.js";

export class LogOut {
    constructor (prisma) {
        this.prisma = prisma
    }

    async execute(refreshToken) {
            await this.prisma.refreshToken.deleteMany({
                where: {
                    token: refreshToken
                }
            })
    }
}