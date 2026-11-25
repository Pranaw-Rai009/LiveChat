 export class DeleteUser {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(userId) {
        await this.prisma.$transaction(async(tx) => {
        const allRoomMembership = await tx.roomMember.findMany({
            where: {
                user: {
                    id: userId
                },
                leftAt: null
            }
        })
    //     if(allRoomMembership.length === 0) {
    //         const updateUserStatus =  await tx.user.update({
    //         where: {
    //             id: userId
    //         }, 
    //         data: {
    //            userName: `deleted_${userId}`,
    //                 email: `deleted_${userId}@deleted.invalid`,
    //                 password: `deleted_${userId}`,
    //                 profilePic: null,
    //                 globalStatus: "DISABLED",
    //         }
    //     })
    // }

        for (const roomMember of allRoomMembership) {
            const count = await tx.roomMember.count({
                where: {
                    roomId: roomMember.roomId,
                    userId: {not: userId},
                    leftAt: null,
                    user: { globalStatus: "ENABLED"}
                }
            })
            if(count === 0) {
                await tx.message.deleteMany({ where: { roomMember: { roomId: roomMember.roomId } } })
                await tx.roomMember.deleteMany({ where: {roomId: roomMember.roomId}})
                await tx.room.delete({ where: {id: roomMember.roomId}})
                continue
            }
            if(roomMember.role === "ADMIN") {
                const oldestMember = await tx.roomMember.findFirst({
                    where: {
                        roomId: roomMember.roomId,
                        userId: { not: roomMember.userId},
                        leftAt: null,
                        user: {
                            globalStatus: "ENABLED"
                        }
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
        } else {
            await tx.roomMember.update({
                where: {
                    id: roomMember.id
                },
                data: {
                    leftAt: new Date()
                }
            })
        }
        }
        await tx.refreshToken.deleteMany({
            where: {
                userId
            }
        })
        const updateUserStatus =  await tx.user.update({
            where: {
                id: userId
            }, 
            data: {
               userName: `deleted_${userId}`,
                    email: `deleted_${userId}@deleted.invalid`,
                    password: `deleted_${userId}`,
                    profilePic: null,
                    globalStatus: "DISABLED",
            }
        })
           })
    }
}