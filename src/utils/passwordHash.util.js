import bcrypt from 'bcrypt'

export const hashPasssword = async function(password) {
    const saltRounds = 15
    return await bcrypt.hash(password, saltRounds)
} 

export const comparePassword = async function(newPassword, userPaswword) {
    return await bcrypt.compare(newPassword, userPaswword)
}