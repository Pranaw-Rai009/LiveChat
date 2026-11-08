// import { JsonNullClass } from "@prisma/client/runtime/client";
import  ApiError  from "../../utils/apiError.util.js";

export class FetchAllUsers {
    constructor(prisma) {
        this.prisma  = prisma
    }

    async execute() {
        const allUsers = await this.prisma.user.findMany()
        if (allUsers.length === 0) return null
        return allUsers
    }
}