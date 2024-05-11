import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'email is required',
    }),
    password: z.string().min(1, {
        message: 'password is required',
    }),
    resetPass: z.boolean().optional(),
})
export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'email is required',
    }),
    password: z.string().min(6, {
        message: 'minumun 6 characters required',
    }),
    name: z.string().min(4, {
        message: 'minimun 4 letter is required',
    }),
})

export const passwordResetSchema = z
    .object({
        password: z.string().min(6, {
            message: 'minimum 6 characters required',
        }),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })
export const resetPageScheme = z.object({
    email: z.string().email({
        message: 'email is required',
    }),
})
