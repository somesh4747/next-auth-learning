'use server'

import * as Z from 'zod'
import { LoginSchema } from '@/schemas'

//importing the error handing from nextjs
import { AuthError } from 'next-auth'

import { signIn } from '@/auth' //its actually using next-auth server side
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'

export const login = async (values: Z.infer<typeof LoginSchema>) => {
    const dataValidation = LoginSchema.safeParse(values)

    if (!dataValidation.success) {
        return {
            error: 'invalid fields' || '',
        }
    }

    const { email, password } = dataValidation.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser?.emailVerified) {
        const token = await generateVerificationToken(existingUser?.email)

        return { success: 'Verification email has been sent' || '' }
    }
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
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
