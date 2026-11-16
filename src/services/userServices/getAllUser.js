// import { JsonNullClass } from "@prisma/client/runtime/client";
import { Profiler } from "react";
import  ApiError  from "../../utils/apiError.util.js";

export class FetchAllUsers {
    constructor(prisma) {
        this.prisma  = prisma
    }

    async execute() {
        const allUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                userName: true,
                email: true,
                profilePic: true,
                globalRole: true,
                createdAt: true,
                updatedAT: true,
                globalStatus: true
            }
        })
        if (allUsers.length === 0) return null
       
        return allUsers
    }
}