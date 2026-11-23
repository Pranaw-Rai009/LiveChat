export class RoomExist {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(roomId, db = this.prisma) {
        const room = await db.room.findUnique({
            where: {
                id: roomId
            } 
        })
        if(room === null) return null
        return room
    }
}
