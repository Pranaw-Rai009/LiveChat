import { ApiError } from "../../utils/apiError.util.js";

class GetAllUsers {
    constructor(prisma) {
        this.prisma  = prisma
    }

    async getAllUsers() {
        const allUsers = await this.prisma.user.findMany()
        if (allUsers.length === 0) return null
    }
}