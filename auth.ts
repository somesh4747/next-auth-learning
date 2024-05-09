import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './lib/db'
import authConfig from './auth.config'
import { getUserById } from './data/user'
import { userRole } from '@prisma/client'
import { use } from 'react'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/login',
        error: '/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date(),
                },
            })
        },
    },

    callbacks: {
        async signIn({ user, account }) {
            //if Oauth providers then dont need to check for email verification
            if (account?.provider !== 'credentials') {
                return true
            }

            // /prevent signin without email verification using credentionals
            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) {
                return false
            }
            return true
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }
            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role

            return token
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as userRole
            }

            return session
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
