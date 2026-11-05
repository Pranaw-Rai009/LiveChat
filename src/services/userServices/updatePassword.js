import ApiError from "../../utils/apiError.util.js";

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
        
    }
}