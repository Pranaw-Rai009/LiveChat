import bcrypt from 'bcrypt'

export const hashPasssword = async function(password) {
    const saltRounds = 15
    return await bcrypt.hash(password, saltRounds)
} 

export const comparePassword = async function(newPassword, userPaswword) {
    console.log("password:", typeof newPassword, typeof hashedPasssword)
    return await bcrypt.compare(newPassword, userPaswword)
}