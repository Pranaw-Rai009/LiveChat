import ApiError from "../../utils/apiError.util.js";

export class FetchRoom {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute() {
        const fetchedRooms = await this.prisma.room.findMany({})
        if(!fetchedRooms) throw new ApiError(500, "Error occured while fetching rooms!")
        if(fetchedRooms.length === 0) return 
        return fetchedRooms
    }
}