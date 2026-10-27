import bcrypt from 'bcrypt'

export const hashPasssword = async function(password) {
    // const saltRounds = 15
    return await bcrypt.hash(password, 15)
} 

export const comparePassword = async function(newPassword, hashedPassword) {
    return await bcrypt.compare(newPassword, hashPasssword)
}