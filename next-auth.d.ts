import { userRole } from '@prisma/client'

import NextAuth, { type DefaultSession } from 'next-auth'

export type extendedUser = DefaultSession['user'] & {
    role: userRole
    isTwofactorEnabled: boolean
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            role: userRole
            isTwofactorEnabled: boolean
        }
    }
}
