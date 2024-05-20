import { useSession } from 'next-auth/react'

/**
 * 
 * @returns current user role from client
 */
export const useCurrentUserRole = () => {
    const session = useSession()

    return session.data?.user.role
}
