import { UserScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace"

 export class DeleteUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        await this.prisma.$transaction(async(tx) => {
        const allRoomMembership = await tx.roomMember.findMany({
            where: {
                userId,
                leftAt: null
            }
        })
        if(allRoomMembership === null) {
            const updateUserStatus =  await tx.user.update({
            where: {
                id: roomMember.userId
            }, 
            data: {
                userName: `$livechatuser${roomMember.userId}`,
                email: `anonymous${roomMember.userId}@gmail.com`,
                password: `deleted${roomMember.userId}`,
                profilePic: null,
                globalState: "DISABLED",
            }
        })
        return
        }

        for (const roomMember in allRoomMembership) {
            const count = await tx.prisma.roomMember.count({
                where: {
                    roomId: roomMember.id,
                    userId: {not: userId},
                    leftAt: null,
                    user: { globalState: "ENABLED"}
                }
            })
            if(count === 0) {
                await tx.message.deleteMany({ where: {roomMemberId: roomMember.id }})
                await tx.roomMember.deleteMany({ where: {roomId: roomMember.roomId}})
                await tx.room.delete({ where: {id: roomMember.roomId}})
                return
            }
            if(roomMember.role === "ADMIN") {
                const oldestMember = await tx.roomMember.findFirst({
                    where: {
                        roomId: roomMember.roomId,
                        userId: { not: roomMember.userId},
                        leftAt: null
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
                await tx.room.update({
                    where: {
                        id: roomMember.roomId
                    },
                    data: {
                        adminId: oldestMember.userId
                    }
                })
                await tx.roomMember.update({
                    where: {
                        // roomId: roomMember.roomId,
                        // userId: oldestMember.userId
                        id: oldestMember.id
                    },
                    data: {
                        role: "ADMIN"
                    }
                })
            }
            const updateMe = await tx.roomMember.update({
                where: {
                    // roomId_userId: { roomId: roomMember.roomId, userId: roomMember.userId }
                    id:  roomMember.id
                },
                data: {
                    leftAt: new Date(),
                    role: "MEMBER"
                }
            })
            
            await tx.refreshToken.deleteMany({
                where: {
                    userId: roomMember.userId
                }
            })
        }
        const updateUserStatus =  await tx.user.update({
            where: {
                id: roomMember.userId
            }, 
            data: {
               userName: `deleted_${userId}`,
                    email: `deleted_${userId}@deleted.invalid`,
                    password: `deleted_${userId}`,
                    profilePic: null,
                    globalState: "DISABLED",
            }
        })
           })
    }
}