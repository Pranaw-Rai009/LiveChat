import ApiError from "../../utils/apiError.util.js";
import { hashPasssword, comparePassword } from "../../utils/passwordHash.util.js"

export class UpdateUserPassword {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(oldPassword, newPassword1, newPassword2, owner) {
        const userId = owner.id
        const hashedPassword = owner.password
        const isCorrectPassword = await comparePassword(oldPassword, hashedPassword)
        if (isCorrectPassword === false) throw new ApiError(401, "Incorrect password entered!")
        if (newPassword1 !== newPassword2) throw new ApiError(400, "New Passwords don't match!")

        const newHasehdPassword = await hashPasssword(newPassword1)

        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: newHasehdPassword
            }
        })
    }
}