import { db } from '@/lib/db'

export const getVerficationTokenByEmail = async (email: string) => {
    try {
        const token = await db.verificationToken.findFirst({
            where: { email },
        })
        return token
    } catch {
        return null
    }
}
export const getVerficationTokenByToken = async (token: string) => {
    try {
        const verficatonToken = await db.verificationToken.findUnique({
            where: { token },
        })
        return verficatonToken
    } catch {
        return null
    }
}
export const getPasswordVerificationToken = async (token: string) => {
    try {
        const verficatonToken = await db.passwordVerficationToken.findUnique({
            where: { token },
        })
        return verficatonToken
    } catch {
        return null
    }
}
