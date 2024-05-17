import { auth } from "@/auth";

/**
 * 
 * @returns current user session from auth library 'for server side'
 */
export const currentUser = async () => {
    const session = await auth()

    return session?.user

}