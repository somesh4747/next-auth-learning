'use server'

import * as Z from 'zod'
import { LoginSchema } from '@/schemas'

export const login = async (values: Z.infer<typeof LoginSchema>) => {
    const dataValidation = LoginSchema.safeParse(values)

    if (!dataValidation.success) {
        return {
            error: 'wrong credentials',
        }
    }

    return {
        success: 'email sent',
    }
}
