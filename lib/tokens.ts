'use server'

import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import { getVerficationTokenByEmail } from '@/data/verification-token'
import { db } from './db'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 999999).toString()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000) //5 min time for verification

    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) {
        await db.twoFactorVerificationToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }

    const verificationToken = await db.twoFactorVerificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return verificationToken
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000) //1hr time for verification

    const ExistingToken = await getVerficationTokenByEmail(email)

    if (ExistingToken) {
        await db.verificationToken.delete({
            where: {
                id: ExistingToken.id,
            },
        })
    }

    const verficatonToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return verficatonToken
}
export const generateVerificationTokenForPassword_reset = async (
    email: string
) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 600 * 1000)

    const ExistingToken = await getVerficationTokenByEmail(email)

    if (ExistingToken) {
        await db.passwordVerficationToken.delete({
            where: {
                id: ExistingToken.id,
            },
        })
    }

    const verficatonToken = await db.passwordVerficationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return verficatonToken
}
