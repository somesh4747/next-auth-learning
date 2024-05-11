'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken, generateVerificationTokenForPassword_reset } from '@/lib/tokens'
import { getPasswordVerificationToken } from '@/data/verification-token'

import bcrypt from 'bcryptjs'
import { sendPasswordResetMail } from '@/lib/mail'

export const passwordReset = async (token: string, password: string) => {
    const exisingToken = await getPasswordVerificationToken(token)

    if (!exisingToken) return { error: 'token does not exist' }

    if (new Date(exisingToken.expires) < new Date()) {
        return { error: 'token has expired' }
    }

    const existingUser = await getUserByEmail(exisingToken.email)

    if (!existingUser) return { error: 'user does not exist' }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    })

    await db.passwordVerficationToken.delete({
        where: {
            id: exisingToken?.id,
        },
    })

    return { success: 'password resetted' }
}

export const resetMailSend = async (email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'email not found' }
    const newToken = await generateVerificationTokenForPassword_reset(email)

    await sendPasswordResetMail(email, newToken.token)

    return { success: 'Check your inbox' }
}
