import { ApiError } from "../../utils/apiError.util.js";

class DeleteUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async delete(userId) {
        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
        
    }
}