'use server'

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'


import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const newUserValidate = RegisterSchema.safeParse(values)

    if (!newUserValidate.success) {
        return {
            error: 'fill proper details',
        }
    }

    const { email, password, name } = newUserValidate.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'email id already existed' }
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })


    const verificationToken = await generateVerificationToken(email)

    // later we will write code for login token verification
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        success: 'Verification email sent Successfully',
    }
}
