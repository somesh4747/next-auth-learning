'use server'

import * as Z from 'zod'
import { LoginSchema } from '@/schemas'

//importing the error handing from nextjs
import { AuthError } from 'next-auth'

import { signIn } from '@/auth' //its actually using next-auth server side
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { resetMailSend } from './pass-reset'

export const login = async (values: Z.infer<typeof LoginSchema>) => {
    const dataValidation = LoginSchema.safeParse(values)

    if (!dataValidation.success) {
        return {
            error: 'invalid fields' || '',
        }
    }
    console.log(dataValidation.data);
    
    if (dataValidation.data.resetPass === true) {
        // resetMailSend(dataValidation.data.email)
        console.log(dataValidation.data);
        
        return { success: 'Reset mail has been sent' }
    }

    const { email, password } = dataValidation.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'email is not registered' }

    if (!existingUser?.emailVerified) {
        const token = await generateVerificationToken(existingUser?.email)

        await sendVerificationEmail(token.email, token.token)

        return {
            success:
                'Verification email has been sent, verify the email before login',
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
