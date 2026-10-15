import { ApiError } from "../../utils/apiError.util"

export class RegisterUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async register(userData) {
        const {userName, email, password, role} = userData
        const usernameExist = await this.prisma.findUnique({ where: {userName}})
        if(usernameExist) throw new ApiError(409, "User with this username already exist!")
        const emailExist = await this.prisma.findUnique({where: {email}})
        if(email) throw new ApiError(409, "User with this email already exist!")
    }
}