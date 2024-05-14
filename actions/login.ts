'use server'

import * as Z from 'zod'
import { LoginSchema } from '@/schemas'

//importing the error handing from nextjs
import { AuthError } from 'next-auth'

import { signIn } from '@/auth' //its actually using next-auth server side
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail, sendTwoFactorMail } from '@/lib/mail'
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { db } from '@/lib/db'
import { getTwoFactorConfimationByUserId } from '@/data/two-factor-cofirmation'
import { credentialCheck } from './credential-check'


export const login = async (values: Z.infer<typeof LoginSchema>) => {
    const dataValidation = LoginSchema.safeParse(values)

    if (!dataValidation.success) {
        return {
            error: 'invalid fields' || '',
        }
    }

    const { email, password, code } = dataValidation.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'email is not registered' }

    if (!existingUser?.emailVerified && existingUser.email) {
        const token = await generateVerificationToken(existingUser?.email)

        await sendVerificationEmail(token.email, token.token)

        return {
            success:
                'Verification email has been sent, verify the email before login',
        }
    }
    //TODO ::: || ==================timing for resending the verification code for 2FA==================//

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
            //TODO: complete the credential check and verify the password then send 2FA email
            const isCredentialsMatch = await credentialCheck(email, password)

            if (!isCredentialsMatch) {
                return { error: 'invalid Credential' }
            }

            //after checking credentials it is sending mails
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            )

            await sendTwoFactorMail(twoFactorToken.email, twoFactorToken.token)

            return {
                twoFactorStatus: true,
                success: 'Two factor Auth mail has been sent',
            }
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error?.type) {
                case 'CredentialsSignin':
                    return {
                        error: 'invalid credentials',
                    }
                default:
                    return {
                        error: 'something went wrong',
                    }
            }
        }

        throw error
    }
}
