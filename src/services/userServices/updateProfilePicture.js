import {uploadOnCloudinary} from '../../utils/cloudinary.util.js'
import { ApiError } from '../../utils/apiError.util.js'

class UpdateProfilePicture {
    constructor(prisma) {
        this.prisma = prisma
    }

    async update(localFilePath, userId) {
        const uploadResult = await uploadOnCloudinary(localFilePath)
        if(!uploadResult) throw new ApiError(500, "Failed to upload the image to cloudinary!")
        const newProfilePicture = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profilePic: uploadResult.secure_url
            }
        })
        if(!newProfilePicture) throw new ApiError(500, "Couln't upload the image to cloudinary!")
        return newProfilePicture.profilePic
    }
}