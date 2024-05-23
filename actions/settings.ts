'use server'

import { db } from '@/lib/db'

import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { userEmailUpdateSchema, userNameUpdateSchema } from '@/schemas'
import { z } from 'zod'

import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const userNameChange = async (
    values: z.infer<typeof userNameUpdateSchema>
) => {
    const validName = userNameUpdateSchema.safeParse(values)

    if (!validName.success) {
        return {
            error: 'fill proper details',
        }
    }
    const user = await currentUser()

    if (!user?.id) return { error: 'not found' }

    const existingUser = await getUserById(user?.id)

    await db.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            name: validName.data.name,
        },
    })
    return {
        success: 'successfully updated',
    }
}
export const userEmailChange = async (
    values: z.infer<typeof userEmailUpdateSchema>
) => {
    const validData = userEmailUpdateSchema.safeParse(values)

    if (!validData.success) {
        return {
            error: 'fill properly',
        }
    }

    const { email: enteredEmail } = validData.data

    const user = await currentUser()

    if (user?.isOauth) return // oauth providers should not update these settings at all

    if (!user?.id) return { error: 'not found' }

    //TODO : check if the entered email is already present or not.....--> status: DONE
    const existingUser = await getUserByEmail(enteredEmail)

    if (user?.email === enteredEmail) {
        return { error: 'already in use' }
    }
    if (existingUser) {
        return { error: 'email is already present' }
    }

    if (!existingUser) {
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: null,
                email: enteredEmail,
            },
        })
        const token = await generateVerificationToken(enteredEmail)

        await sendVerificationEmail(token.email, token.token)

        return {
            success:
                'Verification email has been sent, verify the email before changing it',
        }
    }

    //----kept it here for update without verification --> development
    // await db.user.update({
    //     where: {
    //         id: user?.id,
    //     },
    //     data: {
    //         email: enteredEmail,
    //     },
    // })
    // return {
    //     success: 'successfully updated',
    // }
}
export const userTwoFactorChange = async (status: boolean) => {
    const user = await currentUser()

    if (user?.isOauth) return // oauth providers should not update these settings at all

    if (!user?.id) return false

    const existingUser = await getUserById(user?.id)

    await db.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            isTwofactorEnabled: status,
        },
    })
    return status // for toast control (UX: improved)
}
