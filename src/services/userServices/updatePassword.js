import ApiError from "../../utils/apiError.util.js";

export class UpdateUserPassword  {
    constructor(prisma) {
        this.prisma = prisma
    }

    async updatePassword(oldPassword, newPassword1, newPassword2) {
        
    }
}