import { useSession } from 'next-auth/react'

/**
 * 
 * @returns current user session from 'next-auth/react'  ---client side
 */
export const useCurrentUser =  () => {
    const session = useSession()

    return  session.data?.user
}
