import { userRole } from '@prisma/client'

import NextAuth, { type DefaultSession } from 'next-auth'

export type extendedUser = DefaultSession['user'] & {
    role: userRole
    isTwofactorEnabled: boolean
    id: string
    name: string | null | undefined
    email: string
    image: string | null
    isOauth: boolean
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            //  extending the session for type safety
            role: userRole
            isTwofactorEnabled: boolean
            id: string
            name: string | null | undefined
            email: string
            image: string | null | any
            isOauth: boolean
        }
    }
}
