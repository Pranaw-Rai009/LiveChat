import { hash } from "bcrypt"
import { ApiError } from "../../utils/apiError.util.js"
import { hashPasssword, comparePassword } from "../../utils/passwordHash.util.js"  
export class RegisterUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async register(userData) {
        const {userName, email, password, role} = userData
        const usernameExist = await this.prisma.user.findUnique({ where: {userName}})
        if(usernameExist) throw new ApiError(409, "User with this username already exist!")
        const emailExist = await this.prisma.user.findUnique({where: {email}})
        if(emailExist) throw new ApiError(409, "User with this email already exist!")

        const lengthOfPassword = password.length
        if(lengthOfPassword < 12) throw new ApiError(400, "Length of password must be greater than 12 character")
        
        const hashedPassword = await hashPasssword(password)
        if(!hashedPassword) throw new ApiError(500, "Couldn't hash the password!")
        
        const isRoleValid = (role === "ADMIN" || role === "USER")
        if(!isRoleValid) throw new ApiError(400, "Invalid role entered!")
            
        if(role === "ADMIN") {
            const existAdmin = await this.prisma.user.findFirst({
                where: {
                    role: "ADMIN"
                }
            })
            if(existAdmin) throw new ApiError(409, "Admin already exist!, Couldn't create new!")

            const createdAdmin = await this.prisma.user.create({
                data: {
                    userName,
                    email,
                    password: hashedPassword,
                    role
                }
            })
            if(!createdAdmin) throw new ApiError(500, "Admin creation unsuccessful!")
            const {password, ...adminDataWithoutPassword} = createdAdmin
            const adminData = {admin: adminDataWithoutPassword, message: "Admin created"}
            return adminData
        }

        if(role === "USER") {
            const createdUser = await this.prisma.user.create({
                data: {
                    userName,
                    email,
                    password: hashedPassword,
                    role
                }
            })
            if(!createdUser) throw new ApiError(500, "User creation unsuccessfull!")
            const {password, ...userDataWithoutPassword} = createdUser
            const userData =  {user: userDataWithoutPassword, message: "User created"}
            // const userData = {user: createdUser, message: "User created"}
            return userData
        }
    }
}


