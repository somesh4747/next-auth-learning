'use server'
//------------------todo need to implement later-------------
import { db } from '@/lib/db'

import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getUserByEmail } from '@/data/user'
import { getTwoFactorConfimationByUserId } from '@/data/two-factor-cofirmation'
import { generateTwoFactorToken } from '@/lib/tokens'
import { sendTwoFactorMail } from '@/lib/mail'

export const twoFactorHandleFunction = async (email: string, code: string) => {
    //
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'user not found' }

    if (existingUser.isTwofactorEnabled && existingUser.email) {
        if (code) {
            const existing2FAToken = await getTwoFactorTokenByEmail(
                existingUser.email
            )
            if (!existing2FAToken) return { error: 'invalid code' }

            if (existing2FAToken.token !== code)
                return { error: 'invalid code' }

            if (new Date(existing2FAToken.expires) < new Date())
                return { error: 'code has expired' }

            await db.twoFactorVerificationToken.delete({
                where: {
                    id: existing2FAToken.id,
                },
            })

            const existingConfirmation = await getTwoFactorConfimationByUserId(
                existingUser.id
            )
            if (existingConfirmation) {
                await db.twoFactorConfirmaitonModel.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                })
            }

            await db.twoFactorConfirmaitonModel.create({
                data: {
                    userId: existingUser.id,
                },
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            )

            await sendTwoFactorMail(twoFactorToken.email, twoFactorToken.token)

            return {
                twoFactorStatus: true,
                // success: 'Two factor authentication mail has been sent',
            }
        }
    }
}
