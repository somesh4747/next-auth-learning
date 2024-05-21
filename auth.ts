import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './lib/db'
import authConfig from './auth.config'
import { getUserById } from './data/user'
import { userRole } from '@prisma/client'

import { getTwoFactorConfimationByUserId } from './data/two-factor-cofirmation'

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
        async signIn({ user, account, email }) {
            //if Oauth providers then dont need to check for email verification
            if (account?.provider !== 'credentials') {
                return true
            }

            // /prevent signin without email verification using credentionals
            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) {
                return false
            }
            //=============== my own time base two factor authentication
            if (existingUser.isTwofactorEnabled) {
                const twoFactorStatus = await getTwoFactorConfimationByUserId(
                    existingUser.id
                )

                if (!twoFactorStatus) {
                    return false
                }

                //delete two factor confirmation for next sign in
                await db.twoFactorConfirmaitonModel.delete({
                    where: {
                        userId: existingUser.id,
                    },
                })
            }
            return true
        },
        async jwt({ token }) {
            // console.log('called jwt');
            
            if (!token.sub) {
                return token
            }
            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role
            token.isTwofactorEnabled = existingUser.isTwofactorEnabled

            //this will change userName and email when 'api/auth/session' is called during a update in '/settings' page
            token.name = existingUser.name
            token.email = existingUser.email

            return token
        },
        async session({ token, session }) {
            // console.log('called session');

            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as userRole
            }
            if (token.role && session.user) {
                session.user.isTwofactorEnabled =
                    token.isTwofactorEnabled as boolean
            }

            //as JWT callback run first so it will change the tokens and we can implement those using the session callback
            if (session.user && token.email) {
                session.user.name = token.name
                session.user.email = token.email
            }

            return session
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
