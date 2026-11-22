// import {uploadOnCloudinary} from '../../utils/cloudinary.util.js'/
import {uploadOnCloudinary} from "../../utils/cloudinary.util.js"
import  ApiError  from '../../utils/apiError.util.js'

export class UpdateProfilePicture {
    constructor(prisma) {
        this.prisma = prisma
    }

    async execute(localFilePath, userId) {
        console.log(localFilePath)
        const uploadResult = await uploadOnCloudinary(localFilePath)
        console.log(uploadResult)
        try {  
                const newProfilePicture = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profilePic: uploadResult.secure_url
            }
        })
        } catch(err) {
            throw err
        }
        return newProfilePicture.profilePic
    }
}