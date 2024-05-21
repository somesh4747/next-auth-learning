'use server'

import { db } from '@/lib/db'

import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { userEmailUpdateSchema, userNameUpdateSchema } from '@/schemas'
import { z } from 'zod'

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
            error: 'fill proper details',
        }
    }
    const user = await currentUser()

    if (!user?.id) return { error: 'not found' }

    //TODO : check if the entered email is already present or not.....
    const existingUser = await getUserById(user?.id)

    await db.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            email: validData.data.email,
        },
    })
    return {
        success: 'successfully updated',
    }
}
export const userTwoFactorChange = async (status: boolean) => {
    const user = await currentUser()

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
