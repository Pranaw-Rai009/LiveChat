import  ApiError  from "../../utils/apiError.util.js";

 export class DeleteUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
        
    }
}