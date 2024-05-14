'use server'

import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'

export const credentialCheck = async (email: string, password: string) => {
    //
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.password) return false

    const isPasswordMatched = await bcrypt.compare(
        password,
        existingUser.password
    )

    if (isPasswordMatched) return true

    return false
}
