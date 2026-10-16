import { hash } from "bcrypt"
import { ApiError } from "../../utils/apiError.util.js"
import { hashPasssword, comparePassword } from "../../utils/passwordHash.util.js"  
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

        const lengthOfPassword = password.length()
        if(lengthOfPassword < 12) throw new ApiError(400, "Length of password must be greater than 12 character")
        
        const hashedPassword = await hashPasssword(password)
        if(!hashedPasssword) throw new ApiError(500, "Couldn't hash the password!")
        
        if(role === "ADMIN") {
            const existAdmin = await this.prisma.findFirst({
                where: {
                    role: "ADMIN"
                }
            })
            if(existAdmin) throw new ApiError(409, "Admin already exist!, Couldn't create new!")

            const createAdmin = await this.prisma.create({
                data: {
                    userName,
                    email,
                    password: hashedPassword,
                    role
                }
            })
            if(!createAdmin) throw new ApiError(500, "Admin creation unsuccessful!")
            const adminData = {admin: createAdmin, message: "Admin created"}
            return adminData
        }

        if(role === "USER") {
            const createUser = await this.prisma.create({
                data: {
                    userName,
                    email,
                    password,
                    role
                }
            })
            if(!createUser) throw new ApiError(500, "User creation unsuccessfull!")
            const userData =  {user: createUser, message: "User created"}
            return userData
        }
    }
}