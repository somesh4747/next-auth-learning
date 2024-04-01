'use server'

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const newUserValidate = RegisterSchema.safeParse(values)

    if (!newUserValidate.success) {
        return {
            error: 'fill proper details',
        }
    }

    return {
        success: 'Email sent',
    }
}
