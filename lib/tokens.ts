import { v4 as uuidv4 } from 'uuid'
import { getVerficationTokenByEmail } from '@/data/verification-token'
import { db } from './db'

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

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
