import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcrypt from 'bcryptjs'
import github from 'next-auth/providers/github'
import google from 'next-auth/providers/google'

export default {
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)
                // console.log(validatedFields.success);  
                
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) return null

                    const isPasswordMatched = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (isPasswordMatched) {
                        return user
                    }
                }
                return null
            },
        }),
    ],
} satisfies NextAuthConfig
