import ApiError from "../../utils/apiError.util.js"
import { hashPasssword } from "../../utils/passwordHash.util.js"
export class RegisterUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userData) {
        const { userName, email, password } = userData
        const globalRole = "USER"
        const usernameExist = await this.prisma.user.findFirst({ where: { userName } })
        if (usernameExist) throw new ApiError(409, "User with this username already exist!")
        const emailExist = await this.prisma.user.findFirst({ where: { email } })
        if (emailExist) throw new ApiError(409, "User with this email already exist!")

        const lengthOfPassword = password.length
        if (lengthOfPassword < 12) throw new ApiError(400, "Length of password must be greater than 12 character")

        const hashedPassword = await hashPasssword(password)

        let createdUser
        try {
             createdUser = await this.prisma.user.create({
                data: {
                    userName,
                    email,
                    password: hashedPassword,
                    globalRole
                }
            })
        } catch (err) {
            if(err.code === "P2002") throw new ApiError(409, "User already exist with this email or username!")
            throw err
        }
        const { password: _removed, ...userDataWithoutPassword } = createdUser
        const newUserData = { user: userDataWithoutPassword, message: "User created" }
        return newUserData
    }
}


