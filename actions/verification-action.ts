'use server'
import { db } from '@/lib/db'
import { getVerficationTokenByToken } from '@/data/verification-token'
import { getUserByEmail } from '@/data/user'

export const EmailVerification = async (token: string) => {
    const existingToken = await getVerficationTokenByToken(token)

    if (!existingToken) {
        return { error: 'token does not exist' }
    }
    
    const existingUser = await getUserByEmail(existingToken.email)


    if (new Date(existingToken?.expires) < new Date()) {
        return { error: 'token has expired' }
    }

    await db.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken?.id,
        },
    })

    return { success: 'email has verified' }
}
